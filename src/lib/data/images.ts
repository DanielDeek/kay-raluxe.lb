// Editorial fashion photography used until Kay Reluxe product photography is supplied.
// Replace these URLs with the brand's own image files when they are available.
const EDITORIAL_PHOTOS = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae",
  "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3",
  "https://images.unsplash.com/photo-1496217590455-aa63a8350eea",
  "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43",
  "https://images.unsplash.com/photo-1551803091-e20673f15770",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df",
  "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127",
  "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126",
  "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
];

export function editorialImage(seed: string, width = 1200, height = 1500, preferredIndex?: number) {
  const hash = [...seed].reduce((total, character) => total + character.charCodeAt(0), 0);
  const source = EDITORIAL_PHOTOS[(preferredIndex ?? hash) % EDITORIAL_PHOTOS.length];
  return `${source}?auto=format&fit=crop&w=${width}&h=${height}&q=85`;
}
