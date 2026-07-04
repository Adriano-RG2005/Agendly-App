import { IStorageService } from "@/core/application/interfaces/IStorageService";
import { SupabaseClient } from "@supabase/supabase-js";

export class SupabaseStorageService implements IStorageService {
  private bucketName = "business";

  constructor(private readonly storage: SupabaseClient["storage"]) {}

  async uploadFile(path: string, file: File): Promise<string> {
    const { data, error } = await this.storage
      .from(this.bucketName)
      .upload(path, file, {
        upsert: true,
        contentType: file.type,
      });

    if (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }

    return this.getFileUrl(data.path);
  }

  async deleteFile(path: string): Promise<void> {
    const { error } = await this.storage.from(this.bucketName).remove([path]);

    if (error) {
      throw new Error(`Error deleting file: ${error.message}`);
    }
  }

  getFileUrl(path: string): string {
    const { data } = this.storage.from(this.bucketName).getPublicUrl(path);

    return data.publicUrl;
  }
}
