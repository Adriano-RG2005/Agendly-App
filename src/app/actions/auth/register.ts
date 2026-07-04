"use server";

import { registerUseCase } from "@/core/container";
import { RegisterDTO } from "@application/dtos/auth.dto";
import { DomainError } from "@domain/errors";
import { z } from "zod";

export async function registerAction(formData: RegisterDTO) {
  try {
    const parsed = RegisterDTO.safeParse(formData);

    if (!parsed.success) {
      return {
        success: false,
        error: "Datos inválidos",
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
    if (error instanceof DomainError) {
      return {
        success: false,
        error: error.message,
      };
    }

    console.error("Registration Action Error:", error);
    return {
      success: false,
      error: "Error interno del servidor",
    };
  }
}
