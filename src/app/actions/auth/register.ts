"use server";

import { registerUseCase } from "@/core/container";
import { RegisterDTO } from "@application/dtos/auth.dto";
import { z } from "zod";
import { getUserFriendlyMessage } from "@/lib/errors";

export async function registerAction(formData: RegisterDTO) {
  try {
    const parsed = RegisterDTO.safeParse(formData);

    if (!parsed.success) {
      return {
        success: false,
        error: getUserFriendlyMessage("GENERIC_VALIDATION_FAILED"),
        details: z.treeifyError(parsed.error),
      };
    }

    const user = await registerUseCase.execute(parsed.data);

    return {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  } catch (error) {
    console.error("Registration Action Error:", error);
    return {
      success: false,
      error: getUserFriendlyMessage(error),
    };
  }
}
