import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { User, CreditCard, FileText, Calendar, CalendarCheck, Download } from "lucide-react";
import { VisaStatusBadge } from "./VisaStatusBadge";
import { Button } from "./ui/button";

type VisaStatus = "Pending" | "Approved" | "Rejected" | "Expired";

interface Visa {
  id: string;
  passport_number: string;
  reference_number: string;
  full_name: string;
  status: VisaStatus;
  issue_date: string;
  expiry_date: string;
  document_url?: string | null;
}

interface VisaDetailsProps {
  visa: Visa;
}

export function VisaDetails({ visa }: VisaDetailsProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d MMMM yyyy", { locale: fr });
  };

  const isExpired = new Date(visa.expiry_date) < new Date();
  const displayStatus = isExpired && visa.status === "Approved" ? "Expired" : visa.status;
  const canDownload = visa.status === "Approved" && !isExpired && visa.document_url;

  const handleDownload = () => {
    if (visa.document_url) {
      window.open(visa.document_url, '_blank');
    }
  };

  return (
    <div className="gov-card max-w-2xl mx-auto animate-fade-in">
      {/* Header with status */}
      <div className="bg-primary/5 border-b border-border px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Détails du visa
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Référence: {visa.reference_number}
          </p>
        </div>
        <VisaStatusBadge status={displayStatus} size="lg" />
      </div>

      {/* Details grid */}
      <div className="p-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full name */}
          <div className="space-y-1">
            <dt className="text-sm text-muted-foreground flex items-center gap-2">
              <User className="w-4 h-4" />
              Nom complet
            </dt>
            <dd className="text-base font-medium text-foreground">
              {visa.full_name}
            </dd>
          </div>

          {/* Passport number */}
          <div className="space-y-1">
            <dt className="text-sm text-muted-foreground flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Numéro de passeport
            </dt>
            <dd className="text-base font-medium text-foreground">
              {visa.passport_number}
            </dd>
          </div>

          {/* Reference number */}
          <div className="space-y-1">
            <dt className="text-sm text-muted-foreground flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Numéro de référence
            </dt>
            <dd className="text-base font-medium text-foreground">
              {visa.reference_number}
            </dd>
          </div>

          {/* Status */}
          <div className="space-y-1">
            <dt className="text-sm text-muted-foreground">
              Statut
            </dt>
            <dd>
              <VisaStatusBadge status={displayStatus} />
            </dd>
          </div>

          {/* Issue date */}
          <div className="space-y-1">
            <dt className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date d'émission
            </dt>
            <dd className="text-base font-medium text-foreground">
              {formatDate(visa.issue_date)}
            </dd>
          </div>

          {/* Expiry date */}
          <div className="space-y-1">
            <dt className="text-sm text-muted-foreground flex items-center gap-2">
              <CalendarCheck className="w-4 h-4" />
              Date d'expiration
            </dt>
            <dd className={`text-base font-medium ${isExpired ? "text-destructive" : "text-foreground"}`}>
              {formatDate(visa.expiry_date)}
              {isExpired && (
                <span className="text-sm text-destructive ml-2">(expiré)</span>
              )}
            </dd>
          </div>
          </dl>

        {/* Download button for approved visas */}
        {canDownload && (
          <div className="mt-8 pt-6 border-t border-border">
            <Button 
              onClick={handleDownload}
              className="w-full sm:w-auto gap-2"
              size="lg"
            >
              <Download className="w-5 h-5" />
              Télécharger le document visa
            </Button>
          </div>
        )}
      </div>

      {/* Footer note */}
      <div className="bg-muted/50 px-6 py-4 text-xs text-muted-foreground border-t border-border">
        <p>
          <strong>Information :</strong> Ce document est fourni à titre informatif. 
          Pour toute question concernant votre visa, veuillez contacter les services consulaires.
        </p>
      </div>
    </div>
  );
}