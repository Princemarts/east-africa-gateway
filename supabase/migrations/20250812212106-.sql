-- Add a minimal policy to satisfy the linter while keeping the table secure
-- This policy denies all access, forcing authentication through the RPC function only
CREATE POLICY "Deny all direct access to admin_users" ON public.admin_users
FOR ALL USING (FALSE);