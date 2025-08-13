-- Create project_interests table for tracking investor interest
CREATE TABLE public.project_interests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  investment_amount TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.project_interests ENABLE ROW LEVEL SECURITY;

-- Create policies for project interests
CREATE POLICY "Anyone can submit project interest" 
ON public.project_interests 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin can view project interests" 
ON public.project_interests 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM admin_users WHERE admin_users.username = 'admin'
));

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_project_interests_updated_at
BEFORE UPDATE ON public.project_interests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();