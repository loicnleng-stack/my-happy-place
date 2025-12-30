import { useState, useEffect } from "react";
import { User, CreditCard, FileText, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

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

interface VisaFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  visa: Visa | null;
  onSuccess: () => void;
}

const visaSchema = z.object({
  full_name: z.string().trim().min(1, "Le nom est requis").max(200, "Nom trop long"),
  passport_number: z.string().trim().min(1, "Le numéro de passeport est requis").max(50, "Numéro trop long"),
  reference_number: z.string().trim().min(1, "Le numéro de référence est requis").max(50, "Numéro trop long"),
  status: z.enum(["Pending", "Approved", "Rejected", "Expired"]),
  issue_date: z.string().min(1, "La date d'émission est requise"),
  expiry_date: z.string().min(1, "La date d'expiration est requise"),
});

export function VisaFormDialog({
  open,
  onOpenChange,
  visa,
  onSuccess,
}: VisaFormDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    passport_number: "",
    reference_number: "",
    status: "Pending" as VisaStatus,
    issue_date: "",
    expiry_date: "",
  });

  useEffect(() => {
    if (visa) {
      setFormData({
        full_name: visa.full_name,
        passport_number: visa.passport_number,
        reference_number: visa.reference_number,
        status: visa.status,
        issue_date: visa.issue_date,
        expiry_date: visa.expiry_date,
      });
    } else {
      setFormData({
        full_name: "",
        passport_number: "",
        reference_number: "",
        status: "Pending",
        issue_date: "",
        expiry_date: "",
      });
    }
  }, [visa, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = visaSchema.safeParse(formData);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    if (new Date(formData.expiry_date) < new Date(formData.issue_date)) {
      toast.error("La date d'expiration doit être après la date d'émission");
      return;
    }

    setIsLoading(true);

    try {
      if (visa) {
        // Update existing visa
        const { error } = await supabase
          .from("visas")
          .update(formData)
          .eq("id", visa.id);

        if (error) throw error;
        toast.success("Visa mis à jour avec succès");
      } else {
        // Create new visa
        const { error } = await supabase.from("visas").insert([formData]);

        if (error) {
          if (error.message.includes("duplicate key")) {
            toast.error("Un visa avec ce passeport et cette référence existe déjà");
            return;
          }
          throw error;
        }
        toast.success("Visa créé avec succès");
      }

      onSuccess();
    } catch (error) {
      console.error("Error saving visa:", error);
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {visa ? "Modifier le visa" : "Nouveau visa"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Full name */}
          <div className="space-y-2">
            <Label htmlFor="full_name" className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              Nom complet
            </Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
              placeholder="Jean Dupont"
              maxLength={200}
            />
          </div>

          {/* Passport number */}
          <div className="space-y-2">
            <Label htmlFor="passport_number" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              Numéro de passeport
            </Label>
            <Input
              id="passport_number"
              value={formData.passport_number}
              onChange={(e) =>
                setFormData({ ...formData, passport_number: e.target.value })
              }
              placeholder="AB1234567"
              maxLength={50}
            />
          </div>

          {/* Reference number */}
          <div className="space-y-2">
            <Label htmlFor="reference_number" className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              Numéro de référence
            </Label>
            <Input
              id="reference_number"
              value={formData.reference_number}
              onChange={(e) =>
                setFormData({ ...formData, reference_number: e.target.value })
              }
              placeholder="VISA-2024-001234"
              maxLength={50}
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Statut</Label>
            <Select
              value={formData.status}
              onValueChange={(value: VisaStatus) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">En attente</SelectItem>
                <SelectItem value="Approved">Approuvé</SelectItem>
                <SelectItem value="Rejected">Refusé</SelectItem>
                <SelectItem value="Expired">Expiré</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dates row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Issue date */}
            <div className="space-y-2">
              <Label htmlFor="issue_date" className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                Émission
              </Label>
              <Input
                id="issue_date"
                type="date"
                value={formData.issue_date}
                onChange={(e) =>
                  setFormData({ ...formData, issue_date: e.target.value })
                }
              />
            </div>

            {/* Expiry date */}
            <div className="space-y-2">
              <Label htmlFor="expiry_date" className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                Expiration
              </Label>
              <Input
                id="expiry_date"
                type="date"
                value={formData.expiry_date}
                onChange={(e) =>
                  setFormData({ ...formData, expiry_date: e.target.value })
                }
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Enregistrement..."
                : visa
                ? "Mettre à jour"
                : "Créer le visa"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}