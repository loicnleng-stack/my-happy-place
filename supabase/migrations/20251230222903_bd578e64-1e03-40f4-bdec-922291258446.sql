-- Create storage bucket for visa documents
INSERT INTO storage.buckets (id, name, public) VALUES ('visa-documents', 'visa-documents', false);

-- Add document_url column to visas table
ALTER TABLE public.visas ADD COLUMN document_url TEXT;

-- Storage policies for visa documents
CREATE POLICY "Admins can upload visa documents"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'visa-documents' 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can view visa documents"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'visa-documents' 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete visa documents"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'visa-documents' 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);