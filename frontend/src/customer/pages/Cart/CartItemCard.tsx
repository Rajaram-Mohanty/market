import React from "react";
import { IconButton, Divider, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import type { CartItem } from "../../../types/cartTypes";
import { useAppDispatch } from "../../../state/store";
import { updateCartItem } from "../../../state/customer/cartSlice";

const CartItemCard = ({ item }: { item: CartItem }) => {
  const dispatch = useAppDispatch();

  const handleUpdateQuantity = (value: number) => {
    dispatch(
      updateCartItem({
        jwt: localStorage.getItem("jwt"),
        cartItemId: item.id,
        cartItem: { quantity: item.quantity + value },
      }),
    );
  };

  return (
    <div className="border rounded-md relative">
      <div className="p-5 flex gap-3">
        <div>
          <img
            className="w-[90px] rounded-md"
            src={item.product.images?.[0]}
            alt="Product"
          />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-lg">
            {item.product.seller?.businessDetails?.businessName}
          </h1>
          <p className="text-sm text-gray-600 font-medium">
            {item.product.title}
          </p>
          <p className="text-sm text-gray-600 font-medium">Size: M</p>
          <p className="text-extra-small text-gray-400">
            <strong className="text-sm text-gray-500">Sold by:</strong> 7-day
            replacement available
          </p>
          <p className="text-sm text-gray-500">{item.quantity}</p>
        </div>
      </div>

      {/* Remove Item Button */}

      <Divider />

      {/* Bottom Section: Quantity Controls and Price */}
      <div className="px-5 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2 w-[140px] justify-between">
          {/* Decrease Quantity */}
          <Button onClick={() => handleUpdateQuantity(-1)} disabled={true}>
            <RemoveIcon />
          </Button>

          <span>{item.quantity}</span>

          {/* Increase Quantity */}
          <Button onClick={() => handleUpdateQuantity(1)}>
            <AddIcon />
          </Button>
        </div>

        {/* Pricing Info */}
        <div className="text-gray-700 font-medium">
          <span className="text-sm">{item.sellingPrice}</span>
        </div>
      </div>
      <div className="absolute top-1 right-1">
        <IconButton className="" color="primary">
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default CartItemCard;
