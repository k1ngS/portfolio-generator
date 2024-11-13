"use client";

import { Button } from "@/components/ui/button";
import { CircleUserRound, X } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Label } from "./ui/label";
import { useTranslations } from "next-intl";

interface ProfileAvatarProps {
  onImageChange: (file: File | null, url: string | null) => void;
}

export default function ProfileAvatar({ onImageChange }: ProfileAvatarProps) {
  const t = useTranslations('portfolio');
  const previewRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleThumbnailClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      previewRef.current = url;
      onImageChange(file, url);
      console.log("File selected:", file);
    }
  }, [onImageChange]);

  const handleRemove = useCallback(() => {
    previewUrl && URL.revokeObjectURL(previewUrl);
    setFileName(null);
    setPreviewUrl(null);
    previewRef.current = null;
    onImageChange(null, null)
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [previewUrl, onImageChange]);

  useEffect(() => {
    return () => {
      previewRef.current && URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  return (
    <div>
      <div className="flex items-center space-x-4 mt-2">
        <div className="relative inline-flex">
          <Button
            variant="outline"
            className="relative size-16 overflow-hidden"
            onClick={handleThumbnailClick}
            aria-label={previewUrl ? "Change image" : "Upload image"}
          >
            {previewUrl ? (
              <Image
                className="h-full w-full object-cover"
                src={previewUrl}
                alt="Preview of uploaded image"
                layout="fill"
              />
            ) : (
              <div aria-hidden="true">
                <CircleUserRound className="opacity-60" size={16} strokeWidth={2} />
              </div>
            )}
          </Button>
          {previewUrl && (
            <Button
              onClick={handleRemove}
              size="icon"
              variant="destructive"
              className="absolute -right-2 -top-2 size-6 rounded-full border-2 border-background"
              aria-label="Remove image"
            >
              <X size={16} />
            </Button>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
            aria-label="Upload image file"
          />
        </div>
        <div>
          <Label>{t('personalInfo.avatar')}</Label>
          <p className="text-sm text-gray-500">{t('personalInfo.avatarHint')}</p>
        </div>
      </div>
      <div className="sr-only" aria-live="polite" role="status">
        {previewUrl ? "Image uploaded and preview available" : "No image uploaded"}
      </div>
    </div>
  );
}
