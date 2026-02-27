import React from "react";
import type { Product } from "../../types/productTypes";
import { useAppDispatch } from "../../state/store";
import { Close } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import { addProductToWishlist } from "../../state/customer/wishlistSlice";

const WishlistProductCard = ({ item }: { item: Product }) => {


    const dispatch = useAppDispatch();

    const handleRemoveFromWishlist = (e:any) => {                  // Uses addProductToWishlist because the backend toggles (adds/removes) the item.                                                                    
        e.stopPropagation();                                       // stopPropagation prevents the click from triggering parent card events.
        item.id && dispatch(addProductToWishlist(item.id));
      };


  return (
    <div className="w-60 relative">
      <div className="w-full h-80">
        <img src={item.images[0]} className="object-top w-full" alt="" />
      </div>
      <div className="pt-3 space-y-1 ">
        <p>{item.title}</p>
        <div className="price flex items-center gap-3">
          <span className="font-sans text-gray-1000">
            Rs {item.sellingPrice}
          </span>
          <span className="thin-line-through text-grey-500">
            Rs {item.mrpPrice}
          </span>
          <span className="text-primary-color font-semibold">
            {item.discountPercent}% off
          </span>
        </div>
      </div>

      <div className="absolute top-1 right-1">
        <button onClick={handleRemoveFromWishlist}>
          <Close className="cursor-pointer bg-white rounded-full p-1" sx={{color:teal[500], fontSize:"2rem"}}/>
        </button>
      </div>
    </div>
  );
};

export default WishlistProductCard;
