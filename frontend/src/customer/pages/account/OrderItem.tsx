import { Avatar } from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderItem = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/account/order/1/1")}
      className="text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer flex items-center gap-5"
    >
      <section>
        <Avatar sx={{ bgcolor: "#00927c" }}>
          <ElectricBoltIcon />
        </Avatar>
      </section>
      <div>
        <h1 className="font-bold text-primary-color">PENDING</h1>
        <p>Arriving by Friday, Oct 04</p>
      </div>
      <div className="p-5 bg-teal-50 flex gap-3 w-full">
        <img
          className="w-[70px]"
          src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt=""
        />
        <div className="flex flex-col justify-between py-2 space-y-1">
          <h1 className="font-bold">Virani Clothing</h1>
          <p>Main Black Dress</p>
          <strong>
            Size: <p>Free</p>
          </strong>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
