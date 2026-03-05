import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { z } from "zod";
import { toast } from "sonner";

const searchSchema = z.object({
  passportNumber: z
    .string()
    .trim()
    .min(1, "Le numéro de passeport est requis")
    .max(50, "Le numéro de passeport est trop long"),
  iuc: z
    .string()
    .trim()
    .min(1, "L'IUC est requis")
    .max(50, "L'IUC est trop long"),
});

export function VisaSearchForm() {
  const [passportNumber, setPassportNumber] = useState("");
  const [iuc, setIuc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = searchSchema.safeParse({ passportNumber, iuc });
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);
    navigate(`/result?passport=${encodeURIComponent(passportNumber.trim())}&reference=${encodeURIComponent(iuc.trim())}`);
  };

  return (
    <div className="gov-card max-w-xl mx-auto">
      <div className="bg-primary/5 border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground">
          Vérification de visa
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="passport">Numéro de passeport</Label>
          <Input
            id="passport"
            placeholder="Ex: AB1234567"
            value={passportNumber}
            onChange={(e) => setPassportNumber(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="iuc">IUC (Identificateur Unique du Client)</Label>
          <Input
            id="iuc"
            placeholder="Ex: IUC-2024-00001"
            value={iuc}
            onChange={(e) => setIuc(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <Button type="submit" className="w-full gap-2" disabled={isLoading}>
          <Search className="w-4 h-4" />
          {isLoading ? "Recherche en cours..." : "Vérifier le visa"}
        </Button>
      </form>

      <div className="bg-muted/50 px-6 py-4 text-xs text-muted-foreground border-t border-border">
        <p>
          Entrez votre numéro de passeport et votre IUC pour vérifier le statut de votre visa.
        </p>
      </div>
    </div>
  );
}
