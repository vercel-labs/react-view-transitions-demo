export type Photo = {
  id: string;
  seed: string;
  title: string;
  location: string;
  photographer: string;
  year: number;
  w: number;
  h: number;
  collection: string;
};

export const photos: Photo[] = [
  { id: "1", seed: "alps", title: "Alpine Morning", location: "Swiss Alps", photographer: "Mia Kern", year: 2024, w: 1200, h: 800, collection: "landscapes" },
  { id: "2", seed: "tokyo", title: "Shinjuku Rain", location: "Tokyo, Japan", photographer: "Kenji Mori", year: 2025, w: 800, h: 1200, collection: "urban" },
  { id: "3", seed: "desert", title: "Sahara Dusk", location: "Morocco", photographer: "Leila Osei", year: 2024, w: 1200, h: 800, collection: "landscapes" },
  { id: "4", seed: "brooklyn", title: "Bedford Ave", location: "Brooklyn, NY", photographer: "Sam Rivera", year: 2025, w: 800, h: 1000, collection: "urban" },
  { id: "5", seed: "ocean", title: "Pacific Horizon", location: "Big Sur, CA", photographer: "Mia Kern", year: 2024, w: 1200, h: 675, collection: "landscapes" },
  { id: "6", seed: "market", title: "Spice Market", location: "Marrakech", photographer: "Leila Osei", year: 2025, w: 900, h: 900, collection: "street" },
  { id: "7", seed: "forest", title: "Redwood Path", location: "Northern California", photographer: "Sam Rivera", year: 2024, w: 800, h: 1200, collection: "landscapes" },
  { id: "8", seed: "seoul", title: "Hongdae Night", location: "Seoul, South Korea", photographer: "Kenji Mori", year: 2025, w: 1200, h: 800, collection: "urban" },
  { id: "9", seed: "harbor", title: "Lisbon Harbor", location: "Lisbon, Portugal", photographer: "Mia Kern", year: 2024, w: 1200, h: 800, collection: "street" },
  { id: "10", seed: "canyon", title: "Slot Canyon", location: "Arizona, USA", photographer: "Sam Rivera", year: 2025, w: 800, h: 1200, collection: "landscapes" },
  { id: "11", seed: "cafe", title: "Morning Ritual", location: "Paris, France", photographer: "Leila Osei", year: 2024, w: 900, h: 900, collection: "street" },
  { id: "12", seed: "rooftop", title: "Manhattan Dusk", location: "New York, NY", photographer: "Kenji Mori", year: 2025, w: 1200, h: 800, collection: "urban" },
];

export function getPhoto(id: string): Photo | undefined {
  return photos.find((p) => p.id === id);
}

export function getCollection(slug: string): Photo[] {
  return photos.filter((p) => p.collection === slug);
}

export function getPicsum(seed: string, w: number, h: number): string {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}
