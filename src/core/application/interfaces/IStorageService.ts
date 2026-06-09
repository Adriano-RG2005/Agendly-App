export interface IStorageService {
  uploadFile(path: string, file: File): Promise<string>;
  deleteFile(path: string): Promise<void>;
  getFileUrl(path: string): string;
}
