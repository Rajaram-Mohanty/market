import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchUserOrderHistory } from "../../../state/customer/orderSlice";
import OrderItemCard from "./OrderItemCard";

const Orders = () => {
  const dispatch = useAppDispatch();
  const { order } = useAppSelector((store) => store);

  useEffect(() => {
    dispatch(fetchUserOrderHistory(localStorage.getItem("jwt") || ""));
  }, []);

  return (
    <div className="text-sm min-h-screen">
      <div className="pb-5">
        <h1 className="font-semibold">All orders</h1>
        <p>from anytime</p>
      </div>
      <div className="space-y-4">
        {order.orders.map((order) => (
          <OrderItemCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
