import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../state/store";
import { fetchHomePageData } from "../state/customer/customerSlice";
import SellerTable from "../admin/pages/sellers/SellersTable";
import Coupon from "../admin/pages/coupon/Coupon";
import AddNewCouponForm from "../admin/pages/coupon/AddNewCouponForm";
import GridTable from "../admin/pages/homepage/GridTable";
import Deal from "../admin/pages/homepage/Deal";
import ShopByCategoryTable from "../admin/pages/homepage/ShopByCategoryTable";
import ElectronicTable from "../admin/pages/homepage/ElectronicTable";
import Profile from "../admin/pages/account/Profile";

const AdminRoutes = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHomePageData());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<SellerTable />} />
      <Route path="/account" element={<Profile />} />
      <Route path="/coupon" element={<Coupon />} />
      <Route path="/add-coupon" element={<AddNewCouponForm />} />
      <Route path="/home-grid" element={<GridTable />} />
      <Route path="/shop-by-category" element={<ShopByCategoryTable />} />
      <Route path="/electronics-category" element={<ElectronicTable />} />
      <Route path="/deals" element={<Deal />} />
    </Routes>
  );
};

export default AdminRoutes;
