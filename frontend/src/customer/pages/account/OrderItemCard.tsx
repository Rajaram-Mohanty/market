import { Avatar } from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import React from "react";
import { useNavigate } from "react-router-dom";
import type { Order, OrderItem } from "../../../types/orderTypes";

import { useAppDispatch } from "../../../state/store";
import { deleteOrder } from "../../../state/customer/orderSlice";

const OrderItemCard = ({ order }: { order: Order }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="text-sm bg-white p-5 space-y-4 border rounded-md relative">
      <div className="flex items-center gap-5">
        <section>
          <Avatar sx={{ bgcolor: "#00927c" }}>
            <ElectricBoltIcon />
          </Avatar>
        </section>
        <div>
          <h1 className="font-bold text-primary-color">{order.orderStatus}</h1>
          <p className="text-xs text-gray-500">Order ID: #{order.orderId}</p>
          <p>Arriving by {order.deliverDate}</p>
        </div>

        {(order.orderStatus === "CANCELLED" ||
          order.orderStatus === "DELIVERED") && (
          <div className="absolute top-4 right-4">
            <button
              className="text-red-500 hover:text-red-700 border border-red-500 hover:bg-red-50 px-3 py-1 rounded transition-colors text-xs font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(
                  deleteOrder({
                    orderId: order.id,
                    jwt: localStorage.getItem("jwt") || "",
                  }),
                );
              }}
            >
              DELETE
            </button>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {order.orderItems?.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/account/order/${order.id}/${item.id}`)}
            className="p-5 bg-teal-50 flex gap-3 w-full cursor-pointer hover:bg-teal-100 transition-colors rounded-md"
          >
            <img className="w-[70px]" src={item.product.images[0]} alt="" />
            <div className="flex flex-col justify-between py-2 space-y-1">
              <h1 className="font-bold">
                {item.product.seller?.businessDetails.businessName}
              </h1>
              <p>{item.product.title}</p>
              <p>
                <strong>Size: </strong>
                {item.size}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItemCard;
