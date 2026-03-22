import React from "react";
import { useAppSelector, useAppDispatch } from "../../../state/store";
import { fetchSellerProfile } from "../../../state/seller/sellerSlice";
import { Avatar, Divider, Card, Box } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const Profile = () => {
  const { seller } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const profile = seller.profile;

  React.useEffect(() => {
    dispatch(fetchSellerProfile(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  if (!profile) {
    return <div className="p-10 text-center text-gray-500">Loading Profile...</div>;
  }

  return (
    <div className="p-5 lg:px-20 min-h-screen">
      <div className="flex flex-col items-center justify-center pb-10">
        <Avatar
          src={profile.businessDetails?.logo}
          sx={{ width: 120, height: 120, mb: 2, bgcolor: "primary.main" }}
        >
          {!profile.businessDetails?.logo && <StorefrontIcon sx={{ fontSize: 60 }} />}
        </Avatar>
        <h1 className="text-3xl font-bold">{profile.businessDetails?.businessName || profile.sellerName}</h1>
        <p className="text-gray-500">{profile.email}</p>
        <span
          className={`mt-2 px-4 py-1 text-xs font-semibold rounded-full ${
            profile.accountStatus === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {profile.accountStatus}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Details */}
        <Card className="p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <ContactMailIcon color="primary" />
            <h2 className="text-xl font-bold">Personal Info</h2>
          </div>
          <Divider sx={{ mb: 3 }} />
          <div className="space-y-3 text-sm">
            <p><strong>Owner Name:</strong> {profile.sellerName}</p>
            <p><strong>Mobile:</strong> {profile.mobile}</p>
            <p><strong>Email:</strong> {profile.email}</p>
          </div>
        </Card>

        {/* Business Details */}
        <Card className="p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <BusinessCenterIcon color="primary" />
            <h2 className="text-xl font-bold">Business Details</h2>
          </div>
          <Divider sx={{ mb: 3 }} />
          <div className="space-y-3 text-sm">
            <p><strong>Business Name:</strong> {profile.businessDetails?.businessName}</p>
            <p><strong>GSTIN:</strong> <span className="font-mono">{profile.GSTIN}</span></p>
            <p><strong>Business Email:</strong> {profile.businessDetails?.businessEmail}</p>
            <p><strong>Business Mobile:</strong> {profile.businessDetails?.businessMobile}</p>
            <p><strong>Address:</strong> {profile.businessDetails?.businessAddress}</p>
            {profile.pickupAddress && (
               <p>
                 <strong>Pickup Location:</strong> {profile.pickupAddress.address}, {profile.pickupAddress.city}, {profile.pickupAddress.state} - {profile.pickupAddress.pincode}
               </p>
            )}
          </div>
        </Card>

        {/* Bank Details */}
        <Card className="p-6 rounded-xl shadow-md md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <AccountBalanceIcon color="primary" />
            <h2 className="text-xl font-bold">Bank Details</h2>
          </div>
          <Divider sx={{ mb: 3 }} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-gray-500">Account Holder</p>
              <p className="font-semibold text-lg">{profile.bankDetails?.accountHolderName || "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">Account Number</p>
              <p className="font-mono text-lg font-semibold">{profile.bankDetails?.accountNumber || "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">IFSC Code</p>
              <p className="font-mono text-lg font-semibold tracking-widest">{profile.bankDetails?.ifscCode || "-"}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
