-- Add policy to allow anyone to insert into investors table (for registration)
CREATE POLICY "Anyone can register as investor" 
ON public.investors 
FOR INSERT 
WITH CHECK (true);