-- Remove the dangerous public SELECT policy
DROP POLICY IF EXISTS "Anyone can search visas" ON public.visas;

-- Add admin SELECT policy so admins can still view all visas
CREATE POLICY "Admins can view all visas"
ON public.visas
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::app_role));