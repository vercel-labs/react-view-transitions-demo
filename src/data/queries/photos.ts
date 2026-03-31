import { notFound } from "next/navigation";
import { cache } from "react";
import { photos, type Photo } from "@/lib/photos";

export const getPhotos = cache(async (): Promise<Photo[]> => {
  return photos;
});

export const getPhoto = cache(async (id: string): Promise<Photo> => {
  const photo = photos.find((p) => p.id === id) ?? null;
  if (!photo) notFound();
  return photo;
});

export const getCollection = cache(async (slug: string): Promise<Photo[]> => {
  return photos.filter((p) => p.collection === slug);
});
