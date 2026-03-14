import { useEffect } from "react";
import WishlistProductCard from "./WishlistProductCard";
import { getWishlistByUserId } from "../../state/customer/wishlistSlice";
import { useAppDispatch, useAppSelector } from "../../state/store";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(getWishlistByUserId());
  }, []);
  return (
    <div className="h-85vh p-5 lg:p-20">
      <section>
        <h1 className="text-2xl font-semibold">
          <strong>My wishlist</strong>{" "}
          {wishlist?.wishlist?.products?.length
            ? `${wishlist.wishlist.products.length} items`
            : "0 items"}
        </h1>

        <div>
          {wishlist?.wishlist?.products?.length ? (
            wishlist.wishlist.products.map((item) => (
              <WishlistProductCard key={item.id} item={item} />
            ))
          ) : (
            <p className="text-gray-500 mt-4">Your wishlist is empty.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
