import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const daysOfWeek = [
  { key: "mon", label: "Lunes" },
  { key: "tue", label: "Martes" },
  { key: "wed", label: "Miércoles" },
  { key: "thu", label: "Jueves" },
  { key: "fri", label: "Viernes" },
  { key: "sat", label: "Sábado" },
  { key: "dom", label: "Domingo" },
];

const defaultSchedule: Record<
  string,
  { active: boolean; start: string; end: string }
> = {
  mon: { active: true, start: "09:00", end: "17:00" },
  tue: { active: true, start: "09:00", end: "17:00" },
  wed: { active: true, start: "09:00", end: "17:00" },
  thu: { active: true, start: "09:00", end: "17:00" },
  fri: { active: true, start: "09:00", end: "17:00" },
  sat: { active: false, start: "09:00", end: "13:00" },
  dom: { active: false, start: "09:00", end: "13:00" },
};

const hours = Array.from(
  { length: 24 },
  (_, i) => `${i.toString().padStart(2, "0")}:00`,
);

export default function Availability() {
  const [schedule, setSchedule] = useState(defaultSchedule);

  const toggleDay = (key: string) => {
    setSchedule((prev) => ({
      ...prev,
      [key]: { ...prev[key], active: !prev[key].active },
    }));
  };

  const updateTime = (key: string, field: "start" | "end", value: string) => {
    setSchedule((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <h1 className="text-2xl font-bold">Disponibilidad</h1>

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
            onClick={() => toast.success("Disponibilidad guardada")}
            className="mt-4"
          >
            Guardar disponibilidad
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
