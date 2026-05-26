import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { CalendarCheck, ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import Link from "next/link";

const availableSlots = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export default function BookAppointment() {
  const { slug } = useParams();
  const [date, setDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<"select" | "form">("select");

  const handleContinue = () => {
    if (date && selectedSlot) setStep("form");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container max-w-lg mx-auto py-8 px-4 animate-fade-in">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={`/${slug}`}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>
          <h1 className="text-xl font-bold">Consultorio María García</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            <Clock className="h-4 w-4" />
            Sesión de terapia · 60 min
          </p>
        </div>

        {step === "select" ? (
          <>
            {/* Calendar */}
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Selecciona una fecha
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => {
                    setDate(d);
                    setSelectedSlot(null);
                  }}
                  disabled={(d) =>
                    d < new Date() || d.getDay() === 0 || d.getDay() === 6
                  }
                  className="rounded-md pointer-events-auto mx-auto"
                />
              </CardContent>
            </Card>

            {/* Time slots */}
            {date && (
              <Card className="mb-6 animate-fade-in">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    Horarios disponibles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={selectedSlot === slot ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSlot(slot)}
                        className={cn(
                          "text-sm",
                          selectedSlot === slot &&
                            "ring-2 ring-ring ring-offset-2",
                        )}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Button
              className="w-full"
              size="lg"
              disabled={!date || !selectedSlot}
              onClick={handleContinue}
            >
              Continuar
            </Button>
          </>
        ) : (
          /* Booking Form */
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-base">Tus datos</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-accent rounded-lg p-3 mt-2">
                <CheckCircle2 className="h-4 w-4 text-accent-foreground" />
                <span>
                  {date?.toLocaleDateString("es-PE", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}{" "}
                  a las {selectedSlot}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Nombre completo</Label>
                <Input
                  id="clientName"
                  placeholder="Juan Pérez"
                  defaultValue="Juan Pérez"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Correo electrónico</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  placeholder="juan@email.com"
                  defaultValue="juan@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientPhone">Teléfono</Label>
                <Input
                  id="clientPhone"
                  type="tel"
                  placeholder="+51 999 888 777"
                  defaultValue="+51 999 888 777"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setStep("select")}
                  className="flex-1"
                >
                  Atrás
                </Button>
                <Button asChild>
                  Confirmar cita
                  <Link href={`/${slug}`} className="flex-1">
                    Confirmar cita
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
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
