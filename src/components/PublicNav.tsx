import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { CalendarCheck } from "lucide-react";
import Link from "next/link";

export function PublicNav() {
  return (
    <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <CalendarCheck className="h-6 w-6 text-primary" />
          <span>Agendly</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link href="/login">Iniciar sesión</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Comenzar gratis</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
