import {
  getFavorites,
  addFavorite,
  deleteFavorite,
} from "@/lib/favorites/favoritesMethods";

// GET
export async function GET(request) {
  const favorites = getFavorites();
  return new Response(JSON.stringify(favorites), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
