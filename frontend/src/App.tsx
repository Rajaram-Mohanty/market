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
import RequireAuth from "./component/RequireAuth";

function App() {
  const dispatch = useAppDispatch();
  const { seller, auth } = useAppSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const role = localStorage.getItem("role");
    if (jwt && role === "ROLE_SELLER") {
      dispatch(fetchSellerProfile(jwt));
    }
  }, []);

  // useEffect(() => {
  //   if (seller.profile) {
  //     navigate("/seller");
  //   }
  // }, [seller]);

  useEffect(() => {
    const jwt = auth.jwt || localStorage.getItem("jwt");
    const role = localStorage.getItem("role");
    if (jwt && role !== "ROLE_SELLER") {
      dispatch(fetchUserProfile({ jwt }));
    }
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
          <Route
            path="/cart"
            element={
              <RequireAuth allowedRoles={["ROLE_CUSTOMER"]}>
                <Cart />
              </RequireAuth>
            }
          />
          <Route
            path="/wishlist"
            element={
              <RequireAuth allowedRoles={["ROLE_CUSTOMER"]}>
                <Wishlist />
              </RequireAuth>
            }
          />
          <Route
            path="/checkout"
            element={
              <RequireAuth allowedRoles={["ROLE_CUSTOMER"]}>
                <Checkout />
              </RequireAuth>
            }
          />
          <Route
            path="/payment/success/:orderId"
            element={
              <RequireAuth allowedRoles={["ROLE_CUSTOMER"]}>
                <PaymentSucess />
              </RequireAuth>
            }
          />
          <Route path="/become-seller" element={<BecomeSeller />} />
          <Route
            path="/account/*"
            element={
              <RequireAuth allowedRoles={["ROLE_CUSTOMER"]}>
                <Account />
              </RequireAuth>
            }
          />
          <Route
            path="/seller/*"
            element={
              <RequireAuth allowedRoles={["ROLE_SELLER"]}>
                <SellerDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/*"
            element={
              <RequireAuth allowedRoles={["ROLE_ADMIN"]}>
                <AdminDashboard />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
