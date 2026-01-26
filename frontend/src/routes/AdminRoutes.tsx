import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SellerTable from '../admin/pages/sellers/SellersTable';
import Coupon from '../admin/pages/coupon/Coupon';
import AddNewCouponForm from '../admin/pages/coupon/AddNewCouponForm';
import GridTable from '../admin/pages/homepage/GridTable';
import Deal from '../admin/pages/homepage/Deal';
import ShopByCategoryTable from '../admin/pages/homepage/ShopByCategoryTable';
import ElectronicTable from '../admin/pages/homepage/ElectronicTable';


const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SellerTable />} />
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