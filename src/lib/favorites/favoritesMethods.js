import { getCookie, setCookie } from "../utils/methods";

// get favorites from cookie
export function getFavorites() {
  return getCookie();
}

// add favorite to cookie
export function addFavorite(favorite) {
  const favorites = getCookie();
  favorites.push(favorite);
  setCookie(favorites);
}

// delete favorite from cookie
export function deleteFavorite(favorite) {
  const favorites = getCookie();
  const index = favorites.indexOf(favorite);
  if (index > -1) {
    favorites.splice(index, 1);
  }
  setCookie(favorites);
}
