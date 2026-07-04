"use server";

import { upsertAvailabilityUseCase } from "@/core/container";
import { UpsertAvailabilityDTO } from "@application/dtos/availability.dto";
import { DomainError } from "@domain/errors";
import { revalidatePath } from "next/cache";

export async function saveAvailabilityAction(
  userId: string,
  data: UpsertAvailabilityDTO,
) {
  try {
    const parsed = UpsertAvailabilityDTO.parse(data);
    const results = await upsertAvailabilityUseCase.execute(userId, parsed);

    revalidatePath("/dashboard/availability");
    return { success: true, data: results };
  } catch (error: any) {
    console.error("Save Availability Action Error:", error);
    if (error instanceof DomainError) {
      return { success: false, error: error.message };
    }
    return {
      success: false,
      error: error.message || "Error al guardar la disponibilidad",
    };
  }
}
