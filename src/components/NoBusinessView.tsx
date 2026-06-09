import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NoBusinessViewProps {
  userName: string;
}

export default function NoBusinessView({ userName }: NoBusinessViewProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Hola, {userName} 👋</h1>
        <p className="text-muted-foreground">Bienvenido a Agendly.</p>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-2 text-primary">
            <AlertCircle className="h-5 w-5" />
            <CardTitle className="text-lg font-semibold">Configuración pendiente</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Para comenzar a recibir reservas, primero debes configurar tu
            perfil de negocio y tu disponibilidad. Esto permitirá que tus
            clientes vean tus servicios y agenden citas.
          </p>
          <Button asChild size="lg" className="w-full sm:w-auto shadow-sm">
            <Link href="/dashboard/profile">Configurar mi negocio</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
