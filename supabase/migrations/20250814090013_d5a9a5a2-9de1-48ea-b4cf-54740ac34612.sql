-- Create support tickets table for investor support
CREATE TABLE public.support_tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  investor_id UUID NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Open',
  priority TEXT NOT NULL DEFAULT 'Medium',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Create policies for support tickets
CREATE POLICY "Investors can view their own tickets" 
ON public.support_tickets 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM investors 
  WHERE investors.id = support_tickets.investor_id 
  AND investors.user_id = auth.uid()
));

CREATE POLICY "Investors can create their own tickets" 
ON public.support_tickets 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM investors 
  WHERE investors.id = support_tickets.investor_id 
  AND investors.user_id = auth.uid()
));

CREATE POLICY "Admin can manage all tickets" 
ON public.support_tickets 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM admin_users 
  WHERE admin_users.username = 'admin'
));

-- Create trigger for updated_at
CREATE TRIGGER update_support_tickets_updated_at
BEFORE UPDATE ON public.support_tickets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();