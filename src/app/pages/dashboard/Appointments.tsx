import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Calendar, Clock, User, Mail, Phone, X } from "lucide-react";

type AppointmentStatus = "upcoming" | "completed" | "cancelled";

interface Appointment {
  id: number;
  client: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  status: AppointmentStatus;
}

const allAppointments: Appointment[] = [
  {
    id: 1,
    client: "Juan Pérez",
    email: "juan@email.com",
    phone: "+51 999 888 777",
    date: "14 abr 2026",
    time: "10:00",
    service: "Terapia psicológica",
    status: "upcoming",
  },
  {
    id: 2,
    client: "Ana López",
    email: "ana@email.com",
    phone: "+51 999 111 222",
    date: "14 abr 2026",
    time: "14:00",
    service: "Terapia psicológica",
    status: "upcoming",
  },
  {
    id: 3,
    client: "Carlos Ruiz",
    email: "carlos@email.com",
    phone: "+51 999 333 444",
    date: "14 abr 2026",
    time: "16:00",
    service: "Terapia psicológica",
    status: "upcoming",
  },
  {
    id: 4,
    client: "Laura Mendoza",
    email: "laura@email.com",
    phone: "+51 999 555 666",
    date: "15 abr 2026",
    time: "09:00",
    service: "Terapia psicológica",
    status: "upcoming",
  },
  {
    id: 5,
    client: "Pedro Sánchez",
    email: "pedro@email.com",
    phone: "+51 999 777 888",
    date: "10 abr 2026",
    time: "11:00",
    service: "Terapia psicológica",
    status: "completed",
  },
  {
    id: 6,
    client: "María Flores",
    email: "mflores@email.com",
    phone: "+51 999 222 333",
    date: "9 abr 2026",
    time: "15:00",
    service: "Terapia psicológica",
    status: "completed",
  },
  {
    id: 7,
    client: "Diego Torres",
    email: "diego@email.com",
    phone: "+51 999 444 555",
    date: "11 abr 2026",
    time: "10:00",
    service: "Terapia psicológica",
    status: "cancelled",
  },
];

const statusConfig: Record<
  AppointmentStatus,
  { label: string; className: string }
> = {
  upcoming: {
    label: "Próxima",
    className: "bg-primary/10 text-primary border-primary/20",
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

function AppointmentCard({ apt }: { apt: Appointment }) {
  const [cancelOpen, setCancelOpen] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/30 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-medium truncate">{apt.client}</p>
          <Badge
            variant="outline"
            className={cn(
              "shrink-0 text-xs",
              statusConfig[apt.status].className,
            )}
          >
            {statusConfig[apt.status].label}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {apt.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {apt.time}
          </span>
          <span className="flex items-center gap-1">
            <Mail className="h-3.5 w-3.5" />
            {apt.email}
          </span>
          <span className="flex items-center gap-1">
            <Phone className="h-3.5 w-3.5" />
            {apt.phone}
          </span>
        </div>
      </div>
      {apt.status === "upcoming" && (
        <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 ml-2 text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>¿Cancelar esta cita?</DialogTitle>
              <DialogDescription>
                Se cancelará la cita de {apt.client} el {apt.date} a las{" "}
                {apt.time}. Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCancelOpen(false)}>
                No, mantener
              </Button>
              <Button
                variant="destructive"
                onClick={() => setCancelOpen(false)}
              >
                Sí, cancelar cita
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default function Appointments() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Citas</h1>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Próximas (4)</TabsTrigger>
          <TabsTrigger value="completed">Completadas (2)</TabsTrigger>
          <TabsTrigger value="cancelled">Canceladas (1)</TabsTrigger>
        </TabsList>
        {(["upcoming", "completed", "cancelled"] as AppointmentStatus[]).map(
          (status) => (
            <TabsContent key={status} value={status} className="space-y-3 mt-4">
              {allAppointments.filter((a) => a.status === status).length ===
              0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    No hay citas {statusConfig[status].label.toLowerCase()}s.
                  </CardContent>
                </Card>
              ) : (
                allAppointments
                  .filter((a) => a.status === status)
                  .map((apt) => <AppointmentCard key={apt.id} apt={apt} />)
              )}
            </TabsContent>
          ),
        )}
      </Tabs>
    </div>
  );
}
