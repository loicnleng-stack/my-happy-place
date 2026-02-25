import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, ShieldAlert } from "lucide-react";
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

  return (
    <div className="gov-card max-w-xl mx-auto">
      <div className="bg-destructive/10 border-b border-destructive/20 px-6 py-4">
        <h2 className="text-lg font-semibold text-destructive flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Service suspendu
        </h2>
      </div>

      <div className="p-6 space-y-4 text-center">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          Vérification temporairement suspendue
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          Ce service a été temporairement suspendu suite à un signalement auprès des autorités compétentes. 
          Une investigation est en cours conformément aux réglementations en vigueur.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          Nous nous excusons pour la gêne occasionnée. Le service sera rétabli une fois la procédure de vérification terminée.
        </p>
      </div>

      <div className="bg-muted/50 px-6 py-4 text-xs text-muted-foreground border-t border-border">
        <p>
          <strong>Réf. :</strong> Suspension préventive — Dossier en cours d'examen. 
          Pour toute question, veuillez contacter les services consulaires.
        </p>
      </div>
    </div>
  );
}