import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VisaDetails } from "@/components/VisaDetails";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type VisaStatus = "Pending" | "Approved" | "Rejected" | "Expired";

interface Visa {
  id: string;
  passport_number: string;
  reference_number: string;
  full_name: string;
  status: VisaStatus;
  issue_date: string;
  expiry_date: string;
}

const Result = () => {
  const [searchParams] = useSearchParams();
  const [visa, setVisa] = useState<Visa | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const passport = searchParams.get("passport");
  const reference = searchParams.get("reference");

  useEffect(() => {
    const fetchVisa = async () => {
      if (!passport || !reference) {
        setError("Paramètres de recherche manquants");
        setIsLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from("visas")
          .select("*")
          .eq("passport_number", passport)
          .eq("reference_number", reference)
          .maybeSingle();

        if (fetchError) {
          throw fetchError;
        }

        if (!data) {
          setError("Aucun visa trouvé avec ces informations. Veuillez vérifier vos données.");
        } else {
          setVisa(data as Visa);
        }
      } catch (err) {
        console.error("Error fetching visa:", err);
        setError("Une erreur est survenue lors de la recherche. Veuillez réessayer.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisa();
  }, [passport, reference]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container">
          {/* Back button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="gap-2">
              <Link to="/">
                <ArrowLeft className="w-4 h-4" />
                Nouvelle recherche
              </Link>
            </Button>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin text-4xl mb-4">⟳</div>
              <p className="text-muted-foreground">Recherche en cours...</p>
            </div>
          )}

          {/* Error state */}
          {!isLoading && error && (
            <div className="max-w-xl mx-auto">
              <div className="gov-card p-8 text-center">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Visa non trouvé
                </h2>
                <p className="text-muted-foreground mb-6">
                  {error}
                </p>
                <Button asChild>
                  <Link to="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Effectuer une nouvelle recherche
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {/* Success state */}
          {!isLoading && visa && <VisaDetails visa={visa} />}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Result;