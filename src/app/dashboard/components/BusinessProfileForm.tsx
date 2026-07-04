"use client";

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
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateBusinessDTO } from "@application/dtos/business.dto";
import { saveBusinessAction } from "@/app/actions/business/business";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";

interface BusinessProfileFormProps {
  userId: string;
  initialData?: any;
}

export default function BusinessProfileForm({
  userId,
  initialData,
}: BusinessProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateBusinessDTO.omit({ userId: true })),
    defaultValues: initialData || {
      name: "",
      serviceName: "",
      durationMin: 60,
      description: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      let imageFormData: FormData | undefined;

      if (imageFile) {
        imageFormData = new FormData();
        imageFormData.append("image", imageFile);
      }

      const result = await saveBusinessAction(
        userId,
        initialData?.id,
        data,
        imageFormData,
      );

      if (result.success) {
        toast.success(
          initialData ? "Perfil actualizado" : "Negocio creado correctamente",
        );
        setImageFile(null);
      } else {
        toast.error(result.error || "Ocurrió un error");
      }
    } catch (error: any) {
      toast.error(error.message || "Error de conexión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información general</CardTitle>
        <CardDescription>
          Estos datos se muestran en tu página pública de reservas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-4">
            <Label>Logo del negocio</Label>
            <ImageUpload
              value={initialData?.imageUrl}
              onChange={(file) => setImageFile(file)}
              onRemove={() => setImageFile(null)}
              disabled={isLoading}
              className="max-w-[300px]"
            />
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del negocio</Label>
              <Input
                id="name"
                placeholder="Ej: Consultorio María García"
                {...register("name")}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceName">Servicio principal</Label>
              <Input
                id="serviceName"
                placeholder="Ej: Terapia psicológica"
                {...register("serviceName")}
                className={errors.serviceName ? "border-destructive" : ""}
              />
              {errors.serviceName && (
                <p className="text-xs text-destructive">
                  {errors.serviceName.message as string}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="durationMin">Duración por defecto (min)</Label>
                <Input
                  id="durationMin"
                  type="number"
                  {...register("durationMin", { valueAsNumber: true })}
                  className={errors.durationMin ? "border-destructive" : ""}
                />
                {errors.durationMin && (
                  <p className="text-xs text-destructive">
                    {errors.durationMin.message as string}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL personalizada (Slug)</Label>
                <Input
                  id="slug"
                  placeholder="ej: maria-garcia"
                  {...register("slug")}
                  disabled={!!initialData}
                />
                <p className="text-[10px] text-muted-foreground italic">
                  {!initialData
                    ? "Si lo dejas vacío se generará automáticamente."
                    : "El slug no se puede cambiar por ahora."}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Cuéntale a tus clientes sobre tu servicio..."
                rows={3}
                {...register("description")}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Guardar cambios" : "Crear negocio"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
