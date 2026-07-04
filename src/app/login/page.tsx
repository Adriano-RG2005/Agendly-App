"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarCheck, Loader2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginDTO } from "@application/dtos/auth.dto";
import { loginAction } from "@/app/actions/auth/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    resolver: zodResolver(LoginDTO),
  });

  const onSubmit = async (data: LoginDTO) => {
    setIsLoading(true);
    try {
      const result = await loginAction(data);

      if (result.success) {
        toast.success("Bienvenido de vuelta");
        router.push("/dashboard");
      } else {
        toast.error(result.error || "Credenciales inválidas");
      }
    } catch (error) {
      toast.error("Error de conexión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 mb-4"
          >
            <CalendarCheck className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Agendly</span>
          </Link>
          <CardTitle className="text-2xl">Bienvenido de vuelta</CardTitle>
          <CardDescription>
            Ingresa a tu cuenta para gestionar tu agenda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="maria@ejemplo.com"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Tu contraseña"
                {...register("password")}
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && (
                <p className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              ¿No tienes cuenta?{" "}
              <Link
                href="/register"
                className="text-primary hover:underline font-medium"
              >
                Regístrate gratis
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
