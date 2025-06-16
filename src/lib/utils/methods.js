import { cookies } from "next/headers";

// get cookie
export function getCookie() {
  const cookieStore = cookies();
  const favorites = cookieStore.get("favorites");
  return favorites ? JSON.parse(favorites.value) : [];
}

// set cookie
export function setCookie(favorites) {
  cookies().set("favorites", JSON.stringify(favorites), {
    path: "/",
    expires: new Date(Date.now() + 60 * 60 * 24 * 365),
  });
}
