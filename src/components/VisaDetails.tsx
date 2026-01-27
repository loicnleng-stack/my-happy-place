import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { User, CreditCard, FileText, Calendar, CalendarCheck, Download, Eye } from "lucide-react";
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
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Document Preview Background for Approved Visas */}
      {canDownload && (
        <div className="relative mb-6 rounded-xl overflow-hidden shadow-lg group">
          {/* Blurred document preview */}
          <div className="relative h-48 sm:h-64 bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden">
            {/* PDF iframe preview - heavily blurred */}
            <iframe
              src={`${visa.document_url}#toolbar=0&navpanes=0&scrollbar=0`}
              className="absolute inset-0 w-full h-full scale-110 blur-[8px] opacity-60 pointer-events-none"
              title="Aperçu du document"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            
            {/* Preview badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium shadow-md">
              <Eye className="w-4 h-4" />
              Aperçu du document
            </div>
            
            {/* Status badge in preview */}
            <div className="absolute top-4 right-4">
              <VisaStatusBadge status={displayStatus} size="lg" />
            </div>
            
            {/* Download CTA overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold text-foreground">Votre visa est prêt</p>
                <p className="text-sm text-muted-foreground">Cliquez pour télécharger le document officiel</p>
              </div>
              <Button 
                onClick={handleDownload}
                size="lg"
                className="gap-2 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Télécharger
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="gov-card">
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

        {/* Secondary download button for approved visas (if preview shown above) */}
        {canDownload && (
          <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Document disponible au téléchargement
            </p>
            <Button 
              onClick={handleDownload}
              variant="outline"
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Télécharger à nouveau
            </Button>
          </div>
        )}
        </div>

        {/* Footer note */}
        <div className="bg-muted/50 px-6 py-4 text-xs text-muted-foreground border-t border-border rounded-b-lg">
          <p>
            <strong>Information :</strong> Ce document est fourni à titre informatif. 
            Pour toute question concernant votre visa, veuillez contacter les services consulaires.
          </p>
        </div>
      </div>
    </div>
  );
}