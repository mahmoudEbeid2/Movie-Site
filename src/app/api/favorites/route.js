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
