// src/app/wishlist/page.js
import WishCard from "@/components/wishcard/wishCard";

export default function WishListPage() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">My Wishlist</h2>
      <WishCard />
    </div>
  );
}
