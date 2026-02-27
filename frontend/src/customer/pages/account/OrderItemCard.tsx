import { Avatar } from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import React from "react";
import { useNavigate } from "react-router-dom";
import type { Order, OrderItem } from "../../../types/orderTypes";

const OrderItemCard = ({item,order}:{item:OrderItem, order:Order}) => {
  const navigate = useNavigate();
 
  return (
    <div
      onClick={() => navigate(`account/order/${order.id}/${item.id}`)}
      className="text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer flex items-center gap-5"
    >
      <section>
        <Avatar sx={{ bgcolor: "#00927c" }}>
          <ElectricBoltIcon />
        </Avatar>
      </section>
      <div>
        <h1 className="font-bold text-primary-color">PENDING</h1>
        <p>Arriving by {order.deliverDate}</p>
      </div>
      <div className="p-5 bg-teal-50 flex gap-3 w-full">
        <img
          className="w-[70px]"
          src={item.product.images[0]}
          alt=""
        />
        <div className="flex flex-col justify-between py-2 space-y-1">
          <h1 className="font-bold">{item.product.seller?.businessDetails.businessName}</h1>
          <p>{item.product.title}</p>
          <strong>
            Size: <p>Free</p>
          </strong>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
