"use server";

import { loginUseCase } from "@/core/container";
import { LoginDTO } from "@application/dtos/auth.dto";
import { DomainError } from "@domain/errors";

export async function loginAction(formData: LoginDTO) {
  try {
    const parsed = LoginDTO.safeParse(formData);

    if (!parsed.success) {
      return {
        success: false,
        error: "Datos inválidos",
        details: parsed.error.format(),
      };
    }

    const result = await loginUseCase.execute(parsed.data);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    if (error instanceof DomainError) {
      return {
        success: false,
        error: error.message,
      };
    }

    console.error("Login Action Error:", error);
    return {
      success: false,
      error: "Credenciales inválidas",
    };
  }
}
