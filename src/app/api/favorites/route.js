import {
  getFavorites,
  addFavorite,
  deleteFavorite,
} from "@/lib/favorites/favoritesMethods";

// GET favorites api endpoint
export async function GET(request) {
  const favorites = getFavorites();
  return new Response(JSON.stringify(favorites), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// POST favorites api endpoint
export async function POST(request) {
  const { favorite } = await request.json();
  const favorites = getFavorites();
  if (favorites.includes(favorite)) {
    return new Response("Favorite already exists", { status: 400 });
  }
  addFavorite(favorite);
  return new Response(JSON.stringify(favorite), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
