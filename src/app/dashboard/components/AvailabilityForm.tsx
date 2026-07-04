"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { saveAvailabilityAction } from "@/app/actions/business/availability";

const daysOfWeek = [
  { key: 1, label: "Lunes" },
  { key: 2, label: "Martes" },
  { key: 3, label: "Miércoles" },
  { key: 4, label: "Jueves" },
  { key: 5, label: "Viernes" },
  { key: 6, label: "Sábado" },
  { key: 0, label: "Domingo" },
];

const hours = Array.from(
  { length: 24 },
  (_, i) => `${i.toString().padStart(2, "0")}:00`,
);

interface AvailabilityFormProps {
  userId: string;
  businessId: string;
  initialData: any[];
}

export default function AvailabilityForm({
  userId,
  businessId,
  initialData,
}: AvailabilityFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Mapear datos iniciales o usar valores por defecto
  const [schedule, setSchedule] = useState(() => {
    const baseSchedule: Record<
      number,
      { active: boolean; start: string; end: string }
    > = {};

    // Inicializar con valores por defecto
    [0, 1, 2, 3, 4, 5, 6].forEach((day) => {
      const existing = initialData.find((d) => d.dayOfWeek === day);
      baseSchedule[day] = existing
        ? {
            active: existing.isActive,
            start: existing.startTime,
            end: existing.endTime,
          }
        : {
            active: day !== 0 && day !== 6, // Lunes a viernes activo por defecto
            start: "09:00",
            end: "17:00",
          };
    });

    return baseSchedule;
  });

  const toggleDay = (dayKey: number) => {
    setSchedule((prev) => ({
      ...prev,
      [dayKey]: { ...prev[dayKey], active: !prev[dayKey].active },
    }));
  };

  const updateTime = (
    dayKey: number,
    field: "start" | "end",
    value: string,
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [dayKey]: { ...prev[dayKey], [field]: value },
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const slots = Object.entries(schedule).map(([day, data]) => ({
        dayOfWeek: parseInt(day),
        startTime: data.start,
        endTime: data.end,
        isActive: data.active,
      }));

      const result = await saveAvailabilityAction(userId, {
        businessId,
        slots,
      });

      if (result.success) {
        toast.success("Disponibilidad guardada correctamente");
      } else {
        toast.error(result.error || "Error al guardar");
      }
    } catch (error) {
      toast.error("Error de conexión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Horario semanal</CardTitle>
        <CardDescription>
          Configura los días y horarios en que atiendes. Tus clientes solo
          podrán reservar en estos horarios.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {daysOfWeek.map((day) => (
          <div
            key={day.key}
            className="flex items-center gap-4 p-3 rounded-lg border bg-card"
          >
            <Switch
              checked={schedule[day.key].active}
              onCheckedChange={() => toggleDay(day.key)}
            />
            <span className="w-24 font-medium text-sm">{day.label}</span>
            {schedule[day.key].active ? (
              <div className="flex items-center gap-2 flex-1">
                <Select
                  value={schedule[day.key].start}
                  onValueChange={(v) => updateTime(day.key, "start", v)}
                >
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((h) => (
                      <SelectItem key={h} value={h}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-muted-foreground text-sm">a</span>
                <Select
                  value={schedule[day.key].end}
                  onValueChange={(v) => updateTime(day.key, "end", v)}
                >
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((h) => (
                      <SelectItem key={h} value={h}>
                        {h}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">
                No disponible
              </span>
            )}
          </div>
        ))}

        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="mt-4 w-full sm:w-auto"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Guardar disponibilidad
        </Button>
      </CardContent>
    </Card>
  );
}
