"use server";

import {
  createBusinessUseCase,
  updateBusinessUseCase,
  storageService,
} from "@/core/container";
import {
  CreateBusinessDTO,
  UpdateBusinessDTO,
} from "@application/dtos/business.dto";
import { DomainError } from "@domain/errors";
import { revalidatePath } from "next/cache";

export async function saveBusinessAction(
  userId: string,
  businessId: string | undefined,
  data: any,
  imageFormData?: FormData,
) {
  try {
    let imageUrl: string | undefined = data.imageUrl;

    if (imageFormData) {
      const file = imageFormData.get("image") as File | null;

      if (file && file.size > 0) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `logos/${fileName}`;

        imageUrl = await storageService.uploadFile(filePath, file);
      }
    }

    if (!businessId) {
      // Crear negocio
      const dto = CreateBusinessDTO.parse({ ...data, userId, imageUrl });
      const business = await createBusinessUseCase.execute(dto);
      revalidatePath("/dashboard");
      return { success: true, data: business };
    } else {
      // Actualizar negocio
      const dto = UpdateBusinessDTO.parse({ ...data, imageUrl });
      const business = await updateBusinessUseCase.execute(
        businessId,
        userId,
        dto,
      );
      revalidatePath("/dashboard");
      return { success: true, data: business };
    }
  } catch (error: any) {
    console.error("Save Business Action Error:", error);
    if (error instanceof DomainError) {
      return { success: false, error: error.message };
    }
    return {
      success: false,
      error: error.message || "Error al guardar el negocio",
    };
  }
}
