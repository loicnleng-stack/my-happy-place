import { ShieldAlert } from "lucide-react";

const SuspendedPage = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="max-w-lg w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-red-600 px-6 py-4">
        <h1 className="text-white text-lg font-bold flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" />
          Site suspendu
        </h1>
      </div>
      <div className="p-8 text-center space-y-4">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <ShieldAlert className="w-10 h-10 text-red-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          Accès temporairement suspendu
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Ce site a été temporairement suspendu suite à un signalement auprès des autorités compétentes. 
          Une investigation est actuellement en cours conformément aux réglementations en vigueur.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          L'ensemble des services sont indisponibles jusqu'à nouvel ordre.
        </p>
      </div>
      <div className="bg-gray-100 px-6 py-4 text-xs text-gray-500 border-t">
        <p>
          <strong>Réf. :</strong> Suspension préventive — Dossier en cours d'examen.
          Pour toute question, contactez les services consulaires compétents.
        </p>
      </div>
    </div>
  </div>
);

const App = () => <SuspendedPage />;

export default App;
