import React from "react";
import OrderItem from "./OrderItem";

const Orders = () => {
  return (
    <div className="text-sm min-h-screen">
      <div className="pb-5">
        <h1 className="font-semibold">All orders</h1>
        <p>from anytime</p>
      </div>
      <div className="space-y-2">
        {[1, 1, 1, 1].map((item, index) => (
          <OrderItem key={index} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
