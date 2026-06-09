"use client";

import * as React from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (file: File | null) => void;
  onRemove: () => void;
  disabled?: boolean;
  className?: string;
  previewUrl?: string;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled,
  className,
  previewUrl,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [localPreview, setLocalPreview] = React.useState<string | undefined>(previewUrl);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const onDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }

    const preview = URL.createObjectURL(file);
    setLocalPreview(preview);
    onChange(file);
  };

  const onDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleUpload(file);
      }
    },
    [disabled]
  );

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const onRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalPreview(undefined);
    onRemove();
    onChange(null);
  };

  return (
    <div className={cn("space-y-4 w-full", className)}>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-4 transition-all duration-200 flex flex-col items-center justify-center min-h-[150px] cursor-pointer",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          disabled ? "opacity-50 cursor-not-allowed" : "hover:border-primary/50",
          localPreview || value ? "p-0 overflow-hidden" : ""
        )}
        onClick={() => !disabled && !(localPreview || value) && fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={onFileChange}
          disabled={disabled}
        />

        {(localPreview || value) ? (
          <div className="relative aspect-square w-full max-w-[200px]">
            <img
              src={localPreview || value}
              alt="Upload"
              className="object-cover w-full h-full rounded-md"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6"
              onClick={onRemoveClick}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="p-3 bg-primary/10 rounded-full">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Haz clic o arrastra una imagen
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG o WEBP (máx. 2MB)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
