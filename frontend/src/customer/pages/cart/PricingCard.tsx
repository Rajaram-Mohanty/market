import React from "react";
import { Divider } from "@mui/material";
import { useAppSelector } from "../../../state/store";

const PricingCard = () => {
  const { cart } = useAppSelector((store) => store.cart);
  return (
    <div className="space-y-3 p-5">
      <div className="flex justify-between items-center">
        <span>Subtotal</span>
        <span>₹{cart?.totalMrpPrice}</span>
      </div>

      <div className="flex justify-between items-center">
        <span>Discount</span>
        <span className="text-teal-700">-₹{cart?.totalMrpPrice && cart?.totalSellingPrice ? cart.totalMrpPrice - cart.totalSellingPrice : 0}</span>
      </div>

      <div className="flex justify-between items-center">
        <span>Shipping</span>
        <span className="text-teal-700">Free</span>
      </div>

      <div className="flex justify-between items-center">
        <span>Platform Fee</span>
        <span className="text-teal-700">Free</span>
      </div>

      <Divider />

      <div className="flex justify-between items-center font-semibold text-lg text-primary-color">
        <span>Total</span>
        <span>₹{cart?.totalSellingPrice}</span>
      </div>
    </div>
  );
};

export default PricingCard;
