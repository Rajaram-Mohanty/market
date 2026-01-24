import React, { useState } from "react";
import CartItem from "./CartItem";
import PricingCard from "./PricingCard";
import { Divider, IconButton, TextField, Button } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const navigate = useNavigate();

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
  };

  const handleApplyCoupon = () => {
    console.log("Applying coupon:", couponCode);
    // Logic for API integration will go here
    setIsCouponApplied(true);
  };

  const handleRemoveCoupon = () => {
    setIsCouponApplied(false);
    setCouponCode("");
  };

  return (
    <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-3">
          {[1, 1, 1].map((item, index) => (
            <CartItem key={index} />
          ))}
        </div>

        <div className="lg:col-span-1 text-sm space-y-3">
          <div className="border rounded-md px-5 py-3 space-y-5">
            <div className="flex gap-3 text-sm items-center">
              <LocalOfferIcon sx={{ color: "teal", fontSize: "17px" }} />
              <span>Apply Coupons</span>
            </div>

            {!isCouponApplied ? (
              <div className="flex justify-between items-center">
                <TextField
                  onChange={handleCouponChange}
                  placeholder="Coupon Code"
                  size="small"
                  variant="outlined"
                  fullWidth
                />
                <Button onClick={handleApplyCoupon} size="small" sx={{ ml: 2 }}>
                  Apply
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-teal-50 px-5 py-1 rounded-md border border-dashed border-teal-400">
                <span className="font-medium text-teal-700">
                  {couponCode} Applied
                </span>
                <IconButton
                  onClick={handleRemoveCoupon}
                  size="small"
                  color="error"
                >
                  <CloseIcon sx={{ fontSize: "16px" }} />
                </IconButton>
              </div>
            )}
          </div>

          <div className="border rounded-md">
            <PricingCard />
            <div className="p-5">
              <Button
                onClick={() => navigate("/checkout")}
                variant="contained"
                fullWidth
                sx={{ py: "11px" }}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
