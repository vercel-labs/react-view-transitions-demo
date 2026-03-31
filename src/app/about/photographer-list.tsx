import { connection } from "next/server";
import { getPhotos } from "@/data/queries/photos";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const photographers = [
  { name: "Mia Kern", initials: "MK", location: "Berlin, Germany" },
  { name: "Kenji Mori", initials: "KM", location: "Tokyo, Japan" },
  { name: "Leila Osei", initials: "LO", location: "Accra, Ghana" },
  { name: "Sam Rivera", initials: "SR", location: "San Francisco, CA" },
];

export async function PhotographerList() {
  await connection();
  const photos = await getPhotos();

  return (
    <div className="space-y-6">
      {photographers.map((p) => {
        const photoCount = photos.filter(
          (ph) => ph.photographer === p.name
        ).length;
        return (
          <div key={p.name} className="flex items-center gap-4">
            <Avatar size="lg">
              <AvatarFallback className="font-mono text-xs text-white/70 bg-white/5">
                {p.initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white">{p.name}</p>
              <p className="font-mono text-xs text-white/40 mt-0.5">
                {p.location}
              </p>
            </div>
            <span className="font-mono text-xs text-white/30 shrink-0">
              {photoCount} photo{photoCount !== 1 ? "s" : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function PhotographerListSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-white/5" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-28 bg-white/5 rounded" />
            <div className="h-3 w-36 bg-white/5 rounded" />
          </div>
          <div className="h-3 w-16 bg-white/5 rounded" />
        </div>
      ))}
    </div>
  );
}
