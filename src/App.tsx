import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Result from "./pages/Result";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import DocumentVerification from "./pages/DocumentVerification";
import VisaVerification from "./pages/VisaVerification";
import Gouvernement from "./pages/Gouvernement";
import Ministeres from "./pages/Ministeres";
import Administrations from "./pages/Administrations";
import SystemePolitique from "./pages/SystemePolitique";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/gouvernement" element={<Gouvernement />} />
              <Route path="/ministeres" element={<Ministeres />} />
              <Route path="/administrations" element={<Administrations />} />
              <Route path="/systeme-politique" element={<SystemePolitique />} />
              <Route path="/verification" element={<DocumentVerification />} />
              <Route path="/verification/visa" element={<VisaVerification />} />
              <Route path="/verification/permis-conduire" element={<DocumentVerification />} />
              <Route path="/verification/carte-sejour" element={<DocumentVerification />} />
              <Route path="/result" element={<Result />} />
              <Route path="/auth" element={<Auth />} />

              {/* Alias pour éviter les 404 si l'URL est tapée sous /gouvernement */}
              <Route path="/gouvernement/admin/*" element={<Navigate to="/admin" replace />} />

              {/* Tolère /admin/ et sous-chemins éventuels */}
              <Route path="/admin/*" element={<Admin />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
