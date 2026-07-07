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
import { revalidatePath } from "next/cache";
import { getErrorMessage } from "@/lib/errors";

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
      const dto = CreateBusinessDTO.parse({ ...data, userId, imageUrl });
      const business = await createBusinessUseCase.execute(dto);
      revalidatePath("/dashboard");
      return { success: true, data: business };
    } else {
      const dto = UpdateBusinessDTO.parse({ ...data, imageUrl });
      const business = await updateBusinessUseCase.execute(
        businessId,
        userId,
        dto,
      );
      revalidatePath("/dashboard");
      return { success: true, data: business };
    }
  } catch (error) {
    console.error("Save Business Action Error:", error);
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}
