"use server";

import { upsertAvailabilityUseCase } from "@/core/container";
import { UpsertAvailabilityDTO } from "@application/dtos/availability.dto";
import { revalidatePath } from "next/cache";
import { getUserFriendlyMessage } from "@/lib/errors";

export async function saveAvailabilityAction(
  userId: string,
  data: UpsertAvailabilityDTO,
) {
  try {
    const parsed = UpsertAvailabilityDTO.parse(data);
    const results = await upsertAvailabilityUseCase.execute(userId, parsed);

    revalidatePath("/dashboard/availability");
    return { success: true, data: results };
  } catch (error) {
    console.error("Save Availability Action Error:", error);
    return {
      success: false,
      error: getUserFriendlyMessage(error),
    };
  }
}
