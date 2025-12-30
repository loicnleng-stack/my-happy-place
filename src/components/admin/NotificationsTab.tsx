import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, Clock, Loader2 } from "lucide-react";
import { VisaStatusBadge } from "@/components/VisaStatusBadge";
import { format, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";

type VisaStatus = "Pending" | "Approved" | "Rejected" | "Expired";

interface Visa {
  id: string;
  full_name: string;
  passport_number: string;
  reference_number: string;
  status: VisaStatus;
  expiry_date: string;
}

export function NotificationsTab() {
  const [expiringVisas, setExpiringVisas] = useState<Visa[]>([]);
  const [expiredVisas, setExpiredVisas] = useState<Visa[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const { data, error } = await supabase.from("visas").select("*");
      if (error) throw error;

      const now = new Date();
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

      // Visas expirés (mais pas encore marqués)
      const expired = (data || []).filter((v) => {
        const expiry = new Date(v.expiry_date);
        return expiry < now && v.status !== "Expired";
      }) as Visa[];

      // Visas qui expirent dans les 30 prochains jours
      const expiring = (data || []).filter((v) => {
        const expiry = new Date(v.expiry_date);
        return expiry >= now && expiry <= thirtyDaysFromNow && v.status !== "Expired";
      }) as Visa[];

      // Trier par date d'expiration
      expiring.sort((a, b) => new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime());
      expired.sort((a, b) => new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime());

      setExpiringVisas(expiring);
      setExpiredVisas(expired);
    } catch (error) {
      console.error("Erreur lors du chargement des alertes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDaysUntilExpiry = (expiryDate: string): number => {
    return differenceInDays(new Date(expiryDate), new Date());
  };

  const getUrgencyBadge = (days: number) => {
    if (days <= 7) {
      return <Badge variant="destructive">Urgent ({days}j)</Badge>;
    }
    if (days <= 14) {
      return <Badge className="bg-warning text-warning-foreground">{days} jours</Badge>;
    }
    return <Badge variant="secondary">{days} jours</Badge>;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Résumé des alertes */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className={expiredVisas.length > 0 ? "border-destructive/50 bg-destructive/5" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visas expirés à traiter</CardTitle>
            <AlertTriangle className={`h-4 w-4 ${expiredVisas.length > 0 ? "text-destructive" : "text-muted-foreground"}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${expiredVisas.length > 0 ? "text-destructive" : ""}`}>
              {expiredVisas.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Visas dont la date d'expiration est passée
            </p>
          </CardContent>
        </Card>

        <Card className={expiringVisas.length > 0 ? "border-warning/50 bg-warning/5" : ""}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expirent dans 30 jours</CardTitle>
            <Clock className={`h-4 w-4 ${expiringVisas.length > 0 ? "text-warning" : "text-muted-foreground"}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${expiringVisas.length > 0 ? "text-warning" : ""}`}>
              {expiringVisas.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Visas à renouveler prochainement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Visas expirés */}
      {expiredVisas.length > 0 && (
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Visas expirés à traiter
            </CardTitle>
            <CardDescription>
              Ces visas ont expiré mais leur statut n'a pas encore été mis à jour
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Passeport</TableHead>
                  <TableHead>Statut actuel</TableHead>
                  <TableHead>Date d'expiration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expiredVisas.map((visa) => (
                  <TableRow key={visa.id}>
                    <TableCell className="font-medium">{visa.full_name}</TableCell>
                    <TableCell>{visa.passport_number}</TableCell>
                    <TableCell>
                      <VisaStatusBadge status={visa.status} size="sm" />
                    </TableCell>
                    <TableCell className="text-destructive">
                      {format(new Date(visa.expiry_date), "dd/MM/yyyy", { locale: fr })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Visas expirant bientôt */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Visas expirant prochainement
          </CardTitle>
          <CardDescription>
            Visas qui expireront dans les 30 prochains jours
          </CardDescription>
        </CardHeader>
        <CardContent>
          {expiringVisas.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Aucun visa n'expire dans les 30 prochains jours
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Passeport</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date d'expiration</TableHead>
                  <TableHead>Délai</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expiringVisas.map((visa) => (
                  <TableRow key={visa.id}>
                    <TableCell className="font-medium">{visa.full_name}</TableCell>
                    <TableCell>{visa.passport_number}</TableCell>
                    <TableCell>
                      <VisaStatusBadge status={visa.status} size="sm" />
                    </TableCell>
                    <TableCell>
                      {format(new Date(visa.expiry_date), "dd/MM/yyyy", { locale: fr })}
                    </TableCell>
                    <TableCell>
                      {getUrgencyBadge(getDaysUntilExpiry(visa.expiry_date))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
