import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VerifyVisaRequest {
  passport_number: string;
  reference_number: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { passport_number, reference_number } = await req.json() as VerifyVisaRequest;

    // Input validation
    if (!passport_number || typeof passport_number !== 'string') {
      console.log('Missing or invalid passport_number');
      return new Response(
        JSON.stringify({ error: 'Passport number is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!reference_number || typeof reference_number !== 'string') {
      console.log('Missing or invalid reference_number');
      return new Response(
        JSON.stringify({ error: 'Reference number is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize inputs - only allow alphanumeric characters and common separators
    const sanitizedPassport = passport_number.trim().toUpperCase();
    const sanitizedReference = reference_number.trim().toUpperCase();

    // Basic format validation
    if (sanitizedPassport.length < 5 || sanitizedPassport.length > 20) {
      console.log('Invalid passport number length');
      return new Response(
        JSON.stringify({ error: 'Invalid passport number format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (sanitizedReference.length < 5 || sanitizedReference.length > 30) {
      console.log('Invalid reference number length');
      return new Response(
        JSON.stringify({ error: 'Invalid reference number format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with service role key to bypass RLS
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log(`Verifying visa for passport: ${sanitizedPassport}, reference: ${sanitizedReference}`);

    // Query the visa with both passport and reference number (include document_url)
    const { data: visa, error } = await supabase
      .from('visas')
      .select('id, full_name, status, issue_date, expiry_date, passport_number, reference_number, document_url')
      .eq('passport_number', sanitizedPassport)
      .eq('reference_number', sanitizedReference)
      .maybeSingle();

    if (error) {
      console.error('Database query error:', error);
      return new Response(
        JSON.stringify({ error: 'An error occurred while verifying the visa' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!visa) {
      console.log('No visa found for the provided credentials');
      return new Response(
        JSON.stringify({ error: 'No visa found with the provided credentials' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Visa found successfully');

    // Check if visa is approved and not expired to include document URL
    const isExpired = new Date(visa.expiry_date) < new Date();
    const canDownload = visa.status === 'Approved' && !isExpired && visa.document_url;

    // Generate a signed URL for the document if available and visa is approved
    let signedDocumentUrl = null;
    if (canDownload && visa.document_url) {
      // Handle different document_url formats:
      // 1. Full URL with /visa-documents/
      // 2. Just the file path (e.g., "documents/uuid.pdf")
      let filePath = visa.document_url;
      
      // If it's a full URL, extract just the path
      if (visa.document_url.includes('/visa-documents/')) {
        const urlParts = visa.document_url.split('/visa-documents/');
        filePath = urlParts[1];
      }
      
      console.log('Generating signed URL for file path:', filePath);
      
      const { data: signedData, error: signError } = await supabase
        .storage
        .from('visa-documents')
        .createSignedUrl(filePath, 3600); // 1 hour expiry
      
      if (signError) {
        console.error('Error generating signed URL:', signError);
      } else if (signedData) {
        signedDocumentUrl = signedData.signedUrl;
        console.log('Signed URL generated successfully');
      }
    }

    return new Response(
      JSON.stringify({
        visa: {
          id: visa.id,
          full_name: visa.full_name,
          status: visa.status,
          issue_date: visa.issue_date,
          expiry_date: visa.expiry_date,
          passport_number: visa.passport_number,
          reference_number: visa.reference_number,
          document_url: signedDocumentUrl // Only include if approved and not expired
        }
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
