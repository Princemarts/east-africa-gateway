-- Enable authentication for the investors table
-- Add user_id column to investors table to link with auth.users
ALTER TABLE public.investors ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add profile_picture column for investor avatars
ALTER TABLE public.investors ADD COLUMN profile_picture TEXT;

-- Create investor_projects table to track investments
CREATE TABLE public.investor_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  investor_id UUID NOT NULL REFERENCES public.investors(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  investment_amount DECIMAL(15,2),
  investment_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(investor_id, project_id)
);

-- Enable RLS on investor_projects
ALTER TABLE public.investor_projects ENABLE ROW LEVEL SECURITY;

-- Create policies for investor_projects
CREATE POLICY "Investors can view their own investments"
ON public.investor_projects
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.investors
    WHERE investors.id = investor_projects.investor_id
    AND investors.user_id = auth.uid()
  )
);

CREATE POLICY "Admin can view all investments"
ON public.investor_projects
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.username = 'admin'
  )
);

-- Create storage bucket for investor profile pictures
INSERT INTO storage.buckets (id, name, public) VALUES ('investor-profiles', 'investor-profiles', true);

-- Create policies for investor profile pictures
CREATE POLICY "Investors can view all profile pictures"
ON storage.objects
FOR SELECT
USING (bucket_id = 'investor-profiles');

CREATE POLICY "Investors can upload their own profile picture"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'investor-profiles' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Investors can update their own profile picture"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'investor-profiles' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Update RLS policies for investors table to allow authenticated access
CREATE POLICY "Investors can view their own profile"
ON public.investors
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Investors can update their own profile"
ON public.investors
FOR UPDATE
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates on investor_projects
CREATE TRIGGER update_investor_projects_updated_at
BEFORE UPDATE ON public.investor_projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();