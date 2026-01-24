import React from "react";
import { Divider } from "@mui/material";

const PricingCard = () => {
  return (
    <div className="space-y-3 p-5">
      <div className="flex justify-between items-center">
        <span>Subtotal</span>
        <span>₹1000</span>
      </div>

      <div className="flex justify-between items-center">
        <span>Discount</span>
        <span className="text-teal-700">-₹600</span>
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
        <span>₹400</span>
      </div>
    </div>
  );
};

export default PricingCard;
