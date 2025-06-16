import { getData, saveData } from "./localStorgeFunctions";

// add favorite
export function addFavorite(id) {
  const favorites = getData();
  favorites.push(id);
  saveData(favorites);
}
// get
export function getFavorites() {
  const favorites = getData();
  return favorites;
}
// delete
export function deleteFavorite(id) {
  const favorites = getData().filter((favorite) => favorite !== id);
  saveData(favorites);
}
