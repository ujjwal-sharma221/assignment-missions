"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { Blend, Check } from "lucide-react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import Link from "next/link";

import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { defaultImages } from "@/constants/images";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });
        if (result && result.response) {
          const responseImages = result.response as Array<Record<string, any>>;
          setImages(responseImages);
        } else {
          console.error("Failed to get images from Unsplash.");
        }
      } catch (error) {
        console.error(error);
        setImages(defaultImages);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Blend className="size-6 animate-spin" />
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto",
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image.id} |${image.urls.thumb} | ${image.urls.full} | ${image.links.html} | ${image.user.name}`}
            />
            <Image
              fill
              alt="unsplash image"
              className="object-cover rounded-sm"
              src={image.urls.thumb}
            />
            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 h-full w-full text-white bg-black/30 flex items-center justify-center">
                <Check className="size-4" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/10"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
        {errors?.title && <p className="text-rose-600">{errors.title[0]}</p>}
      </div>
    </div>
  );
};
