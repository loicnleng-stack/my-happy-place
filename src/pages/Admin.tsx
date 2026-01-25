import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Shield, Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { AdminTabs, TabsContent } from "@/components/admin/AdminTabs";
import { VisasTab } from "@/components/admin/VisasTab";
import { StatsTab } from "@/components/admin/StatsTab";
import { UsersTab } from "@/components/admin/UsersTab";
import { StorageTab } from "@/components/admin/StorageTab";
import { LogsTab } from "@/components/admin/LogsTab";
import { NotificationsTab } from "@/components/admin/NotificationsTab";
import { toast } from "sonner";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Email invalide").max(255, "Email trop long"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .max(128, "Mot de passe trop long"),
});

const Admin = () => {
  const { user, isLoading: authLoading, isAdmin, signIn, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("visas");
  
  // Admin verification state - requires re-auth each time
  const [isAdminVerified, setIsAdminVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Clear admin verification when leaving the page
  useEffect(() => {
    return () => {
      setIsAdminVerified(false);
    };
  }, []);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setIsVerifying(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Email ou mot de passe incorrect");
        } else {
          toast.error("Erreur de connexion. Veuillez réessayer.");
        }
        return;
      }
      
      // Clear inputs and verify admin access
      setEmail("");
      setPassword("");
      setIsAdminVerified(true);
      toast.success("Accès administrateur vérifié");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSignOut = async () => {
    setIsAdminVerified(false);
    await signOut();
    navigate("/");
  };

  const handleExitAdmin = () => {
    setIsAdminVerified(false);
    navigate("/");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show login form if not verified (always require re-authentication)
  if (!isAdminVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Administration</h1>
            <p className="text-muted-foreground mt-1">
              Entrez vos identifiants pour accéder à l'administration
            </p>
          </div>

          {/* Form card */}
          <div className="gov-card">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Connexion administrateur
              </h2>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                    maxLength={255}
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    Mot de passe
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pr-10"
                      maxLength={128}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11"
                  disabled={isVerifying}
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Vérification...
                    </>
                  ) : (
                    "Accéder à l'administration"
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Back link */}
          <div className="text-center mt-6">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ← Retour à l'accueil
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Check if user is admin after verification
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md p-8">
            <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-warning" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Accès restreint</h1>
            <p className="text-muted-foreground mb-6">
              Vous n'avez pas les droits d'administration.
            </p>
            <Button onClick={handleExitAdmin} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Retour à l'accueil
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Administration</h1>
              <p className="text-muted-foreground mt-1">Tableau de bord complet</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExitAdmin}>
                Quitter l'admin
              </Button>
              <Button variant="destructive" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>

          <AdminTabs activeTab={activeTab} onTabChange={setActiveTab}>
            <TabsContent value="visas"><VisasTab /></TabsContent>
            <TabsContent value="stats"><StatsTab /></TabsContent>
            <TabsContent value="users"><UsersTab /></TabsContent>
            <TabsContent value="storage"><StorageTab /></TabsContent>
            <TabsContent value="logs"><LogsTab /></TabsContent>
            <TabsContent value="notifications"><NotificationsTab /></TabsContent>
          </AdminTabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
