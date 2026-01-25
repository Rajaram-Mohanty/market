import Dashboard from "../seller/pages/seller-dashboard/Dashboard";
import Payment from "../seller/pages/payment/Payment";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Products from "../seller/pages/products/Products";
import AddProduct from "../seller/pages/products/AddProduct";
import Orders from "../seller/pages/orders/Orders";
import Transaction from "../seller/pages/payment/Transaction";
import Profile from "../seller/pages/account/Profile";

const SellerRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/account" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default SellerRoutes;
