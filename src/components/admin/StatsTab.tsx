import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, Clock, XCircle, AlertTriangle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface StatsData {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
  expired: number;
  expiringThisMonth: number;
}

const COLORS = {
  Approved: "hsl(145 65% 35%)",
  Pending: "hsl(40 90% 50%)",
  Rejected: "hsl(0 75% 45%)",
  Expired: "hsl(210 10% 45%)",
};

export function StatsTab() {
  const [stats, setStats] = useState<StatsData>({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
    expired: 0,
    expiringThisMonth: 0,
  });
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: visas, error } = await supabase.from("visas").select("*");
      if (error) throw error;

      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const statsData: StatsData = {
        total: visas?.length || 0,
        approved: visas?.filter((v) => v.status === "Approved").length || 0,
        pending: visas?.filter((v) => v.status === "Pending").length || 0,
        rejected: visas?.filter((v) => v.status === "Rejected").length || 0,
        expired: visas?.filter((v) => v.status === "Expired").length || 0,
        expiringThisMonth:
          visas?.filter((v) => {
            const expiry = new Date(v.expiry_date);
            return expiry <= endOfMonth && expiry >= now && v.status !== "Expired";
          }).length || 0,
      };

      setStats(statsData);

      // Données mensuelles (6 derniers mois)
      const months = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthName = date.toLocaleDateString("fr-FR", { month: "short" });
        const monthVisas = visas?.filter((v) => {
          const created = new Date(v.created_at);
          return (
            created.getMonth() === date.getMonth() &&
            created.getFullYear() === date.getFullYear()
          );
        });
        months.push({
          name: monthName,
          total: monthVisas?.length || 0,
          approved: monthVisas?.filter((v) => v.status === "Approved").length || 0,
          rejected: monthVisas?.filter((v) => v.status === "Rejected").length || 0,
        });
      }
      setMonthlyData(months);
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const pieData = [
    { name: "Approuvés", value: stats.approved, color: COLORS.Approved },
    { name: "En attente", value: stats.pending, color: COLORS.Pending },
    { name: "Rejetés", value: stats.rejected, color: COLORS.Rejected },
    { name: "Expirés", value: stats.expired, color: COLORS.Expired },
  ].filter((d) => d.value > 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approuvés</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejetés</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.rejected}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expirés</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">{stats.expired}</div>
          </CardContent>
        </Card>
        <Card className="border-warning/50 bg-warning/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expirent ce mois</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.expiringThisMonth}</div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Répartition par statut</CardTitle>
          </CardHeader>
          <CardContent>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[250px] text-muted-foreground">
                Aucune donnée disponible
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Évolution mensuelle</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="approved" name="Approuvés" fill={COLORS.Approved} />
                <Bar dataKey="rejected" name="Rejetés" fill={COLORS.Rejected} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
