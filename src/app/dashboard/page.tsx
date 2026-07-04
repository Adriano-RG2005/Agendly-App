import { createClient } from "@infrastructure/lib/supabase/server";
import { getDashboardDataUseCase } from "@/core/container";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Clock, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { NotFoundError } from "@domain/errors";
import NoBusinessView from "@/components/NoBusinessView";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let dashboardData;
  let hasBusiness = true;

  try {
    dashboardData = await getDashboardDataUseCase.execute(user.id);
  } catch (error) {
    if (error instanceof NotFoundError) {
      hasBusiness = false;
    } else {
      throw error;
    }
  }

  const userName =
    user.user_metadata?.name || user.email?.split("@")[0] || "Usuario";

  if (!hasBusiness) {
    return <NoBusinessView userName={userName} />;
  }

  const { stats: dashboardStats, upcomingAppointments } = dashboardData!;

  const stats = [
    {
      label: "Citas hoy",
      value: dashboardStats.todayAppointments.toString(),
      icon: CalendarCheck,
      trend: "hoy",
    },
    {
      label: "Esta semana",
      value: dashboardStats.weekAppointments.toString(),
      icon: TrendingUp,
      trend: "esta semana",
    },
    {
      label: "Clientes únicos",
      value: dashboardStats.uniqueClients.toString(),
      icon: Users,
      trend: "total",
    },
    {
      label: "Próxima cita",
      value: dashboardStats.nextAppointmentTime || "--:--",
      icon: Clock,
      trend: dashboardStats.nextAppointmentTime ? "próximamente" : "sin citas",
    },
  ];

  const statusConfig = {
    pending: {
      label: "Pendiente",
      className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    },
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

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Hola, {userName} 👋</h1>
        <p className="text-muted-foreground">Así va tu día hoy.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="shadow-sm">
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
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">
            Próximas citas
          </CardTitle>
          <Button variant="outline" size="sm" asChild className="font-medium">
            <Link href="/dashboard/appointments">Ver todas</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingAppointments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8 border-2 border-dashed rounded-lg">
                No tienes citas próximas.
              </p>
            ) : (
              upcomingAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors shadow-sm"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-foreground">
                      {apt.clientName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {apt.startTime} - {apt.endTime}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-medium">{apt.date}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "ml-3 shrink-0 px-2 py-0.5",
                      statusConfig[apt.status as keyof typeof statusConfig]
                        ?.className || "",
                    )}
                  >
                    {statusConfig[apt.status as keyof typeof statusConfig]
                      ?.label || apt.status}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
