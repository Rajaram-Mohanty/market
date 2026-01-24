import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OrderStepper from "./OrderStepper";

const OrderDetails = () => {
  const navigate = useNavigate();

  return (
    <Box className="px-5 lg:px-20 pt-10">
      <section className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-[15%]">
          <img
            className="w-full rounded-md"
            src="https://images.clothes.com/example-saree.jpg"
            alt="Product"
          />
        </div>
        <div className="flex-1 space-y-2">
          <h1 className="font-bold text-lg text-primary-color">
            Verani Clothing
          </h1>
          <p className="text-gray-500 font-semibold text-xl">
            Main Black Saree
          </p>
          <p>Size: M</p>
          <Button variant="outlined" onClick={() => navigate(`/reviews/${5}`)}>
            Write Review
          </Button>
        </div>
      </section>

      <section className="mt-10">
        <OrderStepper orderStatus={"SHIPPED"} />
      </section>
    </Box>
  );
};

export default OrderDetails;
