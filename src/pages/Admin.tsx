import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Shield, Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { AdminTabs, TabsContent } from "@/components/admin/AdminTabs";
import { VisasTab } from "@/components/admin/VisasTab";
import { StatsTab } from "@/components/admin/StatsTab";
import { UsersTab } from "@/components/admin/UsersTab";
import { StorageTab } from "@/components/admin/StorageTab";
import { LogsTab } from "@/components/admin/LogsTab";
import { NotificationsTab } from "@/components/admin/NotificationsTab";

const Admin = () => {
  const { user, isLoading: authLoading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("visas");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

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
            <h1 className="text-2xl font-bold text-foreground mb-2">Accès restreint</h1>
            <p className="text-muted-foreground mb-6">
              Vous n'avez pas les droits d'administration.
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Administration</h1>
              <p className="text-muted-foreground mt-1">Tableau de bord complet</p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
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