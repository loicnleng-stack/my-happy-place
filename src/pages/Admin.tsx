import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit2, Trash2, LogOut, Shield, Search, Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VisaStatusBadge } from "@/components/VisaStatusBadge";
import { VisaFormDialog } from "@/components/VisaFormDialog";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type VisaStatus = "Pending" | "Approved" | "Rejected" | "Expired";

interface Visa {
  id: string;
  passport_number: string;
  reference_number: string;
  full_name: string;
  status: VisaStatus;
  issue_date: string;
  expiry_date: string;
  created_at: string;
}

const Admin = () => {
  const { user, isLoading: authLoading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [visas, setVisas] = useState<Visa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVisa, setEditingVisa] = useState<Visa | null>(null);
  const [deletingVisa, setDeletingVisa] = useState<Visa | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchVisas();
    }
  }, [user, isAdmin]);

  const fetchVisas = async () => {
    try {
      const { data, error } = await supabase
        .from("visas")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setVisas((data as Visa[]) || []);
    } catch (error) {
      console.error("Error fetching visas:", error);
      toast.error("Erreur lors du chargement des visas");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingVisa) return;

    try {
      const { error } = await supabase
        .from("visas")
        .delete()
        .eq("id", deletingVisa.id);

      if (error) throw error;

      setVisas(visas.filter((v) => v.id !== deletingVisa.id));
      toast.success("Visa supprimé avec succès");
    } catch (error) {
      console.error("Error deleting visa:", error);
      toast.error("Erreur lors de la suppression");
    } finally {
      setDeletingVisa(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const filteredVisas = visas.filter(
    (visa) =>
      visa.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visa.passport_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visa.reference_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md p-8">
            <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-warning" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Accès restreint
            </h1>
            <p className="text-muted-foreground mb-6">
              Vous n'avez pas les droits d'administration. Veuillez contacter un
              administrateur pour obtenir l'accès.
            </p>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Se déconnecter
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container">
          {/* Page header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Gestion des visas
              </h1>
              <p className="text-muted-foreground mt-1">
                Gérez les visas enregistrés dans le système
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={() => setIsFormOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nouveau visa
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>

          {/* Search bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, passeport ou référence..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Visas table */}
          <div className="gov-card overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredVisas.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {searchQuery
                  ? "Aucun visa ne correspond à votre recherche"
                  : "Aucun visa enregistré"}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Passeport</TableHead>
                    <TableHead>Référence</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Expiration</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVisas.map((visa) => (
                    <TableRow key={visa.id}>
                      <TableCell className="font-medium">
                        {visa.full_name}
                      </TableCell>
                      <TableCell>{visa.passport_number}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {visa.reference_number}
                      </TableCell>
                      <TableCell>
                        <VisaStatusBadge status={visa.status} size="sm" />
                      </TableCell>
                      <TableCell>
                        {format(new Date(visa.expiry_date), "dd/MM/yyyy", {
                          locale: fr,
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingVisa(visa);
                              setIsFormOpen(true);
                            }}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeletingVisa(visa)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Visa form dialog */}
      <VisaFormDialog
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingVisa(null);
        }}
        visa={editingVisa}
        onSuccess={() => {
          fetchVisas();
          setIsFormOpen(false);
          setEditingVisa(null);
        }}
      />

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={!!deletingVisa}
        onOpenChange={(open) => !open && setDeletingVisa(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer ce visa ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le visa de{" "}
              <strong>{deletingVisa?.full_name}</strong> sera définitivement
              supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;