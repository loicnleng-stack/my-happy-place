import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { History, Loader2, FileText, UserPlus, UserMinus, Edit, Trash2, Plus } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface ActivityLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: Record<string, any> | null;
  created_at: string;
}

const ACTION_ICONS: Record<string, React.ReactNode> = {
  create: <Plus className="w-4 h-4 text-success" />,
  update: <Edit className="w-4 h-4 text-primary" />,
  delete: <Trash2 className="w-4 h-4 text-destructive" />,
  grant_role: <UserPlus className="w-4 h-4 text-success" />,
  revoke_role: <UserMinus className="w-4 h-4 text-destructive" />,
};

const ACTION_LABELS: Record<string, string> = {
  create: "Création",
  update: "Modification",
  delete: "Suppression",
  grant_role: "Ajout admin",
  revoke_role: "Retrait admin",
};

const ACTION_VARIANTS: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  create: "default",
  update: "secondary",
  delete: "destructive",
  grant_role: "default",
  revoke_role: "destructive",
};

export function LogsTab() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const { data, error } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;
      setLogs((data as ActivityLog[]) || []);
    } catch (error) {
      console.error("Erreur lors du chargement des logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDescription = (log: ActivityLog): string => {
    const details = log.details || {};
    
    if (log.entity_type === "visa") {
      const name = details.full_name || "Visa";
      switch (log.action) {
        case "create":
          return `Nouveau visa créé pour ${name}`;
        case "update":
          if (details.old_status !== details.new_status) {
            return `Statut changé de ${details.old_status} à ${details.new_status} pour ${name}`;
          }
          return `Visa modifié pour ${name}`;
        case "delete":
          return `Visa supprimé pour ${name}`;
        default:
          return `Action sur visa ${name}`;
      }
    }
    
    if (log.entity_type === "user_role") {
      const userId = details.target_user_id || "utilisateur";
      switch (log.action) {
        case "grant_role":
          return `Rôle admin accordé à ${userId.slice(0, 8)}...`;
        case "revoke_role":
          return `Rôle admin retiré de ${userId.slice(0, 8)}...`;
        default:
          return `Action sur rôle utilisateur`;
      }
    }

    return log.action;
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Historique des activités
          </CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Aucune activité enregistrée
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Utilisateur</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="whitespace-nowrap">
                      {format(new Date(log.created_at), "dd/MM/yyyy HH:mm", { locale: fr })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {ACTION_ICONS[log.action] || <FileText className="w-4 h-4" />}
                        <Badge variant={ACTION_VARIANTS[log.action] || "secondary"}>
                          {ACTION_LABELS[log.action] || log.action}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {log.entity_type === "visa" ? "Visa" : "Rôle"}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {getDescription(log)}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {log.user_id ? `${log.user_id.slice(0, 8)}...` : "—"}
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
