import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Trash2, Loader2, Shield, Search } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";

interface UserRole {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
  email?: string;
}

export function UsersTab() {
  const { user: currentUser } = useAuth();
  const [admins, setAdmins] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [deletingAdmin, setDeletingAdmin] = useState<UserRole | null>(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("*")
        .eq("role", "admin")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAdmins(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des admins:", error);
      toast.error("Erreur lors du chargement des administrateurs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAdmin = async () => {
    if (!newAdminEmail.trim()) {
      toast.error("Veuillez saisir un email");
      return;
    }

    setIsAdding(true);
    try {
      // On ne peut pas récupérer les users de auth.users directement côté client
      // L'admin doit connaître l'UUID de l'utilisateur
      // Pour simplifier, on vérifie si c'est un UUID valide
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(newAdminEmail.trim());
      
      if (!isUUID) {
        toast.error("Veuillez entrer l'ID utilisateur (UUID) de la personne à promouvoir admin");
        setIsAdding(false);
        return;
      }

      // Vérifier si déjà admin
      const { data: existing } = await supabase
        .from("user_roles")
        .select("id")
        .eq("user_id", newAdminEmail.trim())
        .eq("role", "admin")
        .maybeSingle();

      if (existing) {
        toast.error("Cet utilisateur est déjà administrateur");
        setIsAdding(false);
        return;
      }

      const { error } = await supabase.from("user_roles").insert({
        user_id: newAdminEmail.trim(),
        role: "admin",
      });

      if (error) throw error;

      toast.success("Administrateur ajouté avec succès");
      setIsAddDialogOpen(false);
      setNewAdminEmail("");
      fetchAdmins();
    } catch (error: any) {
      console.error("Erreur lors de l'ajout:", error);
      toast.error(error.message || "Erreur lors de l'ajout");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteAdmin = async () => {
    if (!deletingAdmin) return;

    // Empêcher de se supprimer soi-même
    if (deletingAdmin.user_id === currentUser?.id) {
      toast.error("Vous ne pouvez pas vous retirer vos propres droits d'admin");
      setDeletingAdmin(null);
      return;
    }

    try {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("id", deletingAdmin.id);

      if (error) throw error;

      setAdmins(admins.filter((a) => a.id !== deletingAdmin.id));
      toast.success("Administrateur supprimé");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression");
    } finally {
      setDeletingAdmin(null);
    }
  };

  const filteredAdmins = admins.filter((admin) =>
    admin.user_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Gestion des administrateurs
          </CardTitle>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Ajouter un admin
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par ID utilisateur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {filteredAdmins.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Aucun administrateur trouvé
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Utilisateur</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Ajouté le</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-mono text-sm">
                      {admin.user_id}
                      {admin.user_id === currentUser?.id && (
                        <Badge variant="secondary" className="ml-2">Vous</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">Admin</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(admin.created_at).toLocaleDateString("fr-FR")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeletingAdmin(admin)}
                        disabled={admin.user_id === currentUser?.id}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Dialog d'ajout */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un administrateur</DialogTitle>
            <DialogDescription>
              Entrez l'ID utilisateur (UUID) de la personne à promouvoir administrateur.
              L'utilisateur doit d'abord avoir créé un compte.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="ex: a0cc548b-04c5-4e64-9642-9c60a53ac74b"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddAdmin} disabled={isAdding}>
              {isAdding ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={!!deletingAdmin} onOpenChange={(open) => !open && setDeletingAdmin(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Retirer les droits d'admin ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette personne ne pourra plus accéder à l'interface d'administration.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAdmin}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Retirer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
