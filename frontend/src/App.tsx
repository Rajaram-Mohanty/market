import Navbar from "./customer/components/navbar/Navbar";
import { ThemeProvider } from "@mui/material";
import customTheme from "./theme/customTheme";
import Home from "./customer/pages/home/Home";
import Product from "./customer/pages/product/Product";
import ProductDetails from "./customer/pages/page-details/ProductDetails";
import Review from "./customer/pages/review/Review";
import Cart from "./customer/pages/cart/Cart";
import Checkout from "./customer/checkout/Checkout";
import Account from "./customer/pages/account/Account";
import { Route, Routes, useNavigate } from "react-router-dom";
import BecomeSeller from "./customer/pages/become-seller/BecomeSeller";
import SellerDashboard from "./seller/pages/seller-dashboard/Seller";
import AdminDashboard from "./admin/pages/dashboard/AdminDashboard";
import { useAppDispatch, useAppSelector } from "./state/store";
import { useEffect } from "react";
import { fetchSellerProfile } from "./state/seller/sellerSlice";
import { fetchUserProfile } from "./state/authSlice";
import Auth from "./customer/pages/auth/Auth";
import PaymentSucess from "./customer/pages/PaymentSucess";
import Wishlist from "./customer/wishlist/Wishlist";
import { createHomeCategories } from "./state/customer/customerSlice";
import { homeCategories } from "./data/HomeCategories";

function App() {
  const dispatch = useAppDispatch();
  const { seller, auth } = useAppSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSellerProfile(localStorage.getItem("jwt") || ""));
    dispatch(createHomeCategories(homeCategories));
  }, []);

  // useEffect(() => {
  //   if (seller.profile) {
  //     navigate("/seller");
  //   }
  // }, [seller]);

  useEffect(() => {
    dispatch(
      fetchUserProfile({ jwt: auth.jwt || localStorage.getItem("jwt") }),
    );
  }, [auth.jwt]);

  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/products/:category" element={<Product />} />
          <Route path="/reviews/:productId" element={<Review />} />
          <Route
            path="/product-details/:categoryId/:name/:productId"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment/success/:orderId" element={<PaymentSucess />} />
          <Route path="/become-seller" element={<BecomeSeller />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/seller/*" element={<SellerDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
