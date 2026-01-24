import { Divider } from "@mui/material";
import React from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import Orders from "./Orders";
import UserDetails from "./UserDetails";
import Address from "./Address";
import OrderDetails from "./OrderDetails";

const menu = [
  { name: "orders", path: "/account/orders" },
  { name: "profile", path: "/account" },
  { name: "Save card", path: "/account/save-card" },
  { name: "addresses", path: "/account/addresses" },
  { name: "log out", path: "/" },
];

const Account = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (item: any) => {
    navigate(item.path);
  };

  return (
    <div className="px-5 lg:px-52 min-h-screen mt-10">
      <div>
        <h1 className="text-xl font-bold pb-5">Ashok</h1>
      </div>
      <Divider />
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh]">
        <section className="col-span-1 lg:border-r lg:pr-5 py-5 h-full">
          <div className="space-y-2">
            {menu.map((item) => (
              <div
                key={item.name} //helps to make react understand which item of the list is updated
                onClick={() => handleClick(item)}
                className={`${item.path === location.pathname ? "bg-primary-color text-white" : "primary-color"} 
                py-3 px-5 rounded-md cursor-pointer hover:bg-primary-color hover:text-white border-b`}
              >
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="right-section col-span-2 lg:pl-10 p-10 w-full overflow-y-auto">
          <Routes>
            <Route path="/" element={<UserDetails />} />
            <Route path="/profile" element={<UserDetails />} />
            <Route path="/orders" element={<Orders />} />
            <Route
              path="/order/:orderId/:orderItemId"
              element={<OrderDetails />}
            />
            <Route path="/addresses" element={<Address />} />
          </Routes>
        </section>
      </div>
    </div>
  );
};

export default Account;
