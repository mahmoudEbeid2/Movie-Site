import {
  addFavorite,
  deleteFavorite,
  getFavorites,
} from "@/lib/favorites/favoritesFunctions";

// GET favorites
export async function GET() {
  const favorites = await getFavorites();
  return new Response(JSON.stringify(favorites), { status: 200 });
}

// POST favorite or delete
export async function POST(request) {
  const { id } = await request.json();
  const favorites = await getFavorites();

  await addFavorite(id);

  return new Response(JSON.stringify(favorites), { status: 200 });
}
