"use server";

import { loginUseCase } from "@/core/container";
import { LoginDTO } from "@application/dtos/auth.dto";
import { z } from "zod";
import { getErrorMessage } from "@/lib/errors";

export async function loginAction(formData: LoginDTO) {
  try {
    const parsed = LoginDTO.safeParse(formData);

    if (!parsed.success) {
      return {
        success: false,
        error: getErrorMessage("GENERIC_VALIDATION_FAILED"),
        details: z.treeifyError(parsed.error),
      };
    }

    const result = await loginUseCase.execute(parsed.data);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Login Action Error:", error);
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}
