// get data from local storage
export function getData() {
  const data = localStorage.getItem("favorites");
  return data ? JSON.parse(data) : [];
}

// save data to local storage
export function saveData(data) {
  localStorage.setItem("favorites", JSON.stringify(data));
}
