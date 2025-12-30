import { useState, useEffect, useRef } from "react";
import { Plus, Edit2, Trash2, Search, Loader2, FileText, Download, Upload, Filter, X, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VisaStatusBadge } from "@/components/VisaStatusBadge";
import { VisaFormDialog } from "@/components/VisaFormDialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

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
  document_url?: string | null;
}

export function VisasTab() {
  const [visas, setVisas] = useState<Visa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVisa, setEditingVisa] = useState<Visa | null>(null);
  const [deletingVisa, setDeletingVisa] = useState<Visa | null>(null);
  
  // Filtres avancés
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFromFilter, setDateFromFilter] = useState<Date | undefined>();
  const [dateToFilter, setDateToFilter] = useState<Date | undefined>();
  const [showFilters, setShowFilters] = useState(false);
  
  // Import
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    fetchVisas();
  }, []);

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

  const handleExportCSV = () => {
    const headers = ["Nom", "Passeport", "Référence", "Statut", "Date émission", "Date expiration"];
    const csvData = filteredVisas.map((v) => [
      v.full_name,
      v.passport_number,
      v.reference_number,
      v.status,
      v.issue_date,
      v.expiry_date,
    ]);

    const csvContent = [
      headers.join(";"),
      ...csvData.map((row) => row.join(";")),
    ].join("\n");

    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `visas_export_${format(new Date(), "yyyy-MM-dd")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success(`${filteredVisas.length} visas exportés`);
  };

  const handleImportCSV = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);

    try {
      const text = await file.text();
      const lines = text.split("\n").filter((line) => line.trim());
      
      // Skip header
      const dataLines = lines.slice(1);
      
      const visasToImport = dataLines.map((line) => {
        const [full_name, passport_number, reference_number, status, issue_date, expiry_date] = line.split(";").map((s) => s.trim());
        return {
          full_name,
          passport_number,
          reference_number,
          status: (["Pending", "Approved", "Rejected", "Expired"].includes(status) ? status : "Pending") as VisaStatus,
          issue_date,
          expiry_date,
        };
      }).filter((v) => v.full_name && v.passport_number && v.reference_number);

      if (visasToImport.length === 0) {
        toast.error("Aucun visa valide trouvé dans le fichier");
        return;
      }

      const { error } = await supabase.from("visas").insert(visasToImport);

      if (error) throw error;

      toast.success(`${visasToImport.length} visas importés avec succès`);
      fetchVisas();
    } catch (error) {
      console.error("Erreur lors de l'import:", error);
      toast.error("Erreur lors de l'import du fichier");
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const clearFilters = () => {
    setStatusFilter("all");
    setDateFromFilter(undefined);
    setDateToFilter(undefined);
  };

  const hasActiveFilters = statusFilter !== "all" || dateFromFilter || dateToFilter;

  const filteredVisas = visas.filter((visa) => {
    // Recherche textuelle
    const matchesSearch =
      visa.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visa.passport_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visa.reference_number.toLowerCase().includes(searchQuery.toLowerCase());

    // Filtre par statut
    const matchesStatus = statusFilter === "all" || visa.status === statusFilter;

    // Filtre par date d'expiration
    const expiryDate = new Date(visa.expiry_date);
    const matchesDateFrom = !dateFromFilter || expiryDate >= dateFromFilter;
    const matchesDateTo = !dateToFilter || expiryDate <= dateToFilter;

    return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nouveau visa
          </Button>
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="w-4 h-4 mr-2" />
            Exporter CSV
          </Button>
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isImporting}>
            {isImporting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            Importer CSV
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleImportCSV}
          />
        </div>
      </div>

      {/* Recherche et filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, passeport ou référence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant={showFilters ? "default" : "outline"}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtres
          {hasActiveFilters && <span className="ml-1 w-2 h-2 bg-primary-foreground rounded-full" />}
        </Button>
      </div>

      {/* Panneau de filtres */}
      {showFilters && (
        <div className="p-4 border rounded-lg bg-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Filtres avancés</h3>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4 mr-1" />
                Réinitialiser
              </Button>
            )}
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Statut</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Pending">En attente</SelectItem>
                  <SelectItem value="Approved">Approuvé</SelectItem>
                  <SelectItem value="Rejected">Rejeté</SelectItem>
                  <SelectItem value="Expired">Expiré</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Expire après</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateFromFilter && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFromFilter ? format(dateFromFilter, "dd/MM/yyyy") : "Sélectionner"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFromFilter}
                    onSelect={setDateFromFilter}
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Expire avant</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateToFilter && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateToFilter ? format(dateToFilter, "dd/MM/yyyy") : "Sélectionner"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateToFilter}
                    onSelect={setDateToFilter}
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      )}

      {/* Résumé */}
      <div className="text-sm text-muted-foreground">
        {filteredVisas.length} visa{filteredVisas.length > 1 ? "s" : ""} trouvé{filteredVisas.length > 1 ? "s" : ""}
      </div>

      {/* Tableau des visas */}
      <div className="gov-card overflow-hidden">
        {filteredVisas.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {searchQuery || hasActiveFilters
              ? "Aucun visa ne correspond aux critères"
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
                <TableHead>Document</TableHead>
                <TableHead>Expiration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVisas.map((visa) => (
                <TableRow key={visa.id}>
                  <TableCell className="font-medium">{visa.full_name}</TableCell>
                  <TableCell>{visa.passport_number}</TableCell>
                  <TableCell className="text-muted-foreground">{visa.reference_number}</TableCell>
                  <TableCell>
                    <VisaStatusBadge status={visa.status} size="sm" />
                  </TableCell>
                  <TableCell>
                    {visa.document_url ? (
                      <FileText className="w-4 h-4 text-primary" />
                    ) : (
                      <span className="text-muted-foreground text-sm">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {format(new Date(visa.expiry_date), "dd/MM/yyyy", { locale: fr })}
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
              <strong>{deletingVisa?.full_name}</strong> sera définitivement supprimé.
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
}
