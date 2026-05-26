import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function BookingConfirmed() {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md animate-fade-in text-center">
        <div className="mb-6">
          <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold mb-2">¡Cita confirmada!</h1>
          <p className="text-muted-foreground">
            Te hemos enviado un correo con los detalles.
          </p>
        </div>

        <Card className="text-left mb-6">
          <CardContent className="p-6 space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Profesional</p>
              <p className="font-medium">Consultorio María García</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Servicio</p>
              <p className="font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Terapia psicológica · 60 min
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fecha y hora</p>
              <p className="font-medium">Lunes 14 de abril, 2026 · 10:00</p>
            </div>
            <hr className="border-border" />
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" /> Juan Pérez
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />{" "}
                juan@email.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" /> +51 999 888
                777
              </p>
            </div>
          </CardContent>
        </Card>

        <Button variant="outline" asChild className="w-full">
          <Link href={`/${slug}`}>Agendar otra cita</Link>
        </Button>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <CalendarCheck className="h-4 w-4" />
            Potenciado por Agendly
          </Link>
        </div>
      </div>
    </div>
  );
}
