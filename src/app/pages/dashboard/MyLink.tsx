import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, ExternalLink, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function MyLink() {
  const [copied, setCopied] = useState(false);
  const link = "https://agendly.com/maria-garcia";

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Link copiado al portapapeles");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <h1 className="text-2xl font-bold">Mi link</h1>

      <Card>
        <CardHeader>
          <CardTitle>Tu página de reservas</CardTitle>
          <CardDescription>
            Comparte este enlace con tus clientes para que puedan agendar citas
            contigo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Tu link personalizado</Label>
            <div className="flex gap-2">
              <Input value={link} readOnly className="font-mono text-sm" />
              <Button variant="outline" size="icon" onClick={handleCopy}>
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleCopy} className="flex-1">
              <Copy className="mr-2 h-4 w-4" />
              Copiar link
            </Button>
            <Button variant="outline" asChild>
              <a href="/maria-garcia" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver página
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personalizar URL</CardTitle>
          <CardDescription>
            Elige un nombre único para tu página.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              agendly.com/
            </span>
            <Input defaultValue="maria-garcia" className="font-mono" />
          </div>
          <Button
            variant="outline"
            onClick={() => toast.success("URL actualizada")}
          >
            Guardar cambios
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
