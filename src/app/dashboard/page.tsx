import { createClient } from "@infrastructure/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Clock, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const stats = [
  { label: "Citas hoy", value: "3", icon: CalendarCheck, trend: "+2 vs ayer" },
  {
    label: "Esta semana",
    value: "12",
    icon: TrendingUp,
    trend: "+5 vs semana pasada",
  },
  { label: "Clientes únicos", value: "8", icon: Users, trend: "este mes" },
  { label: "Próxima cita", value: "10:00", icon: Clock, trend: "en 45 min" },
];

const upcomingAppointments = [
  {
    id: 1,
    client: "Juan Pérez",
    time: "10:00",
    date: "Hoy",
    service: "Terapia psicológica",
    status: "confirmed" as const,
  },
  {
    id: 2,
    client: "Ana López",
    time: "14:00",
    date: "Hoy",
    service: "Terapia psicológica",
    status: "confirmed" as const,
  },
  {
    id: 3,
    client: "Carlos Ruiz",
    time: "16:00",
    date: "Hoy",
    service: "Terapia psicológica",
    status: "confirmed" as const,
  },
  {
    id: 4,
    client: "Laura Mendoza",
    time: "09:00",
    date: "Mañana",
    service: "Terapia psicológica",
    status: "confirmed" as const,
  },
];

const statusConfig = {
  confirmed: {
    label: "Confirmada",
    className: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  completed: {
    label: "Completada",
    className: "bg-muted text-muted-foreground",
  },
  cancelled: {
    label: "Cancelada",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const userName = user.user_metadata?.name || user.email?.split("@")[0] || "Usuario";

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Hola, {userName} 👋</h1>
        <p className="text-muted-foreground">Así va tu día hoy.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Próximas citas</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/appointments">Ver todas</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingAppointments.map((apt) => (
              <div
                key={apt.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{apt.client}</p>
                  <p className="text-sm text-muted-foreground">{apt.service}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-sm font-medium">{apt.time}</p>
                  <p className="text-xs text-muted-foreground">{apt.date}</p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "ml-3 shrink-0",
                    statusConfig[apt.status].className
                  )}
                >
                  {statusConfig[apt.status].label}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
