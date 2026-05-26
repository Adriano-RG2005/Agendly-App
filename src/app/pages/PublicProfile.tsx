import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck, Clock, MapPin, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PublicProfile() {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container max-w-lg mx-auto py-12 px-4 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <Avatar className="h-20 w-20 mx-auto mb-4">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
              MG
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">Consultorio María García</h1>
          <p className="text-muted-foreground mt-1">Terapia psicológica</p>
        </div>

        {/* Service card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="font-semibold text-lg mb-3">
              Sesión de terapia psicológica
            </h2>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>60 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Videollamada</span>
              </div>
            </div>
            <Button className="w-full" size="lg" asChild>
              <Link href={`/${slug}/book`}>
                Agendar cita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center">
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
