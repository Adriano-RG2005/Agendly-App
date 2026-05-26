import { Button } from "@/components/ui/button";
import { PublicNav } from "@/components/PublicNav";
import {
  CalendarCheck,
  Clock,
  Link2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: CalendarCheck,
    title: "Agenda inteligente",
    description:
      "Tus clientes eligen horarios disponibles sin ida y vuelta por WhatsApp.",
  },
  {
    icon: Link2,
    title: "Tu link personal",
    description:
      "Comparte un enlace único y profesional para recibir reservas.",
  },
  {
    icon: Clock,
    title: "Ahorra tiempo",
    description: "Elimina la gestión manual. Tu agenda se organiza sola.",
  },
];

const steps = [
  {
    num: "1",
    title: "Crea tu perfil",
    desc: "Configura tu negocio en minutos.",
  },
  {
    num: "2",
    title: "Define tu disponibilidad",
    desc: "Elige los días y horarios en que atiendes.",
  },
  {
    num: "3",
    title: "Comparte tu link",
    desc: "Tus clientes reservan directamente.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNav />

      {/* Hero */}
      <section className="flex-1 flex items-center">
        <div className="container py-20 md:py-32 text-center max-w-3xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground mb-6">
            <CheckCircle2 className="h-4 w-4" />
            Gratis para comenzar
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
            Agenda citas <span className="text-gradient">sin esfuerzo</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            La plataforma más simple para que profesionales independientes
            gestionen su agenda y reciban reservas automáticamente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-base px-8">
              <Link href="/register">
                Crear mi agenda gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-base px-8"
            >
              <Link href="/maria-garcia">Ver demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30">
        <div className="container py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Todo lo que necesitas
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-card rounded-xl p-6 border shadow-sm animate-fade-in"
              >
                <div className="h-12 w-12 rounded-lg bg-accent flex items-center justify-center mb-4">
                  <f.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t">
        <div className="container py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Cómo funciona?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s) => (
              <div key={s.num} className="text-center animate-fade-in">
                <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {s.num}
                </div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-primary text-primary-foreground">
        <div className="container py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Empieza hoy, es gratis</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Únete a cientos de profesionales que ya simplifican su agenda con
            Agendly.
          </p>
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="text-base px-8"
          >
            <Link href="/register">Crear mi cuenta</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © 2026 Agendly. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
