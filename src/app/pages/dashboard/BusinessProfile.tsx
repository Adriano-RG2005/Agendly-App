import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function BusinessProfile() {
  const handleSave = () => {
    toast.success("Perfil actualizado correctamente");
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <h1 className="text-2xl font-bold">Perfil del negocio</h1>

      <Card>
        <CardHeader>
          <CardTitle>Información general</CardTitle>
          <CardDescription>
            Estos datos se muestran en tu página pública de reservas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                MG
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Cambiar foto
            </Button>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Nombre del negocio</Label>
              <Input
                id="businessName"
                defaultValue="Consultorio María García"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">Servicio</Label>
              <Input id="service" defaultValue="Terapia psicológica" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duración (min)</Label>
                <Input id="duration" type="number" defaultValue="60" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Modalidad</Label>
                <Input id="location" defaultValue="Videollamada" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                defaultValue="Sesiones de terapia psicológica individual. Enfoque cognitivo-conductual. Ambiente seguro y confidencial."
                rows={3}
              />
            </div>
          </div>

          <Button onClick={handleSave}>Guardar cambios</Button>
        </CardContent>
      </Card>
    </div>
  );
}
