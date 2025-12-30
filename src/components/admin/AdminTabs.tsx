import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, BarChart3, History, HardDrive, Bell } from "lucide-react";

interface AdminTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  children: React.ReactNode;
}

export function AdminTabs({ activeTab, onTabChange, children }: AdminTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-6 mb-6">
        <TabsTrigger value="visas" className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">Visas</span>
        </TabsTrigger>
        <TabsTrigger value="stats" className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          <span className="hidden sm:inline">Statistiques</span>
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span className="hidden sm:inline">Admins</span>
        </TabsTrigger>
        <TabsTrigger value="storage" className="flex items-center gap-2">
          <HardDrive className="w-4 h-4" />
          <span className="hidden sm:inline">Stockage</span>
        </TabsTrigger>
        <TabsTrigger value="logs" className="flex items-center gap-2">
          <History className="w-4 h-4" />
          <span className="hidden sm:inline">Logs</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="w-4 h-4" />
          <span className="hidden sm:inline">Alertes</span>
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
}

export { TabsContent };
