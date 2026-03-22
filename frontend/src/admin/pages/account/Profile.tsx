import React from "react";
import { useAppSelector } from "../../../state/store";
import { Avatar, Divider, Card } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const Profile = () => {
  const { auth } = useAppSelector((store) => store);
  const user = auth.user;

  if (!user) {
    return <div className="p-10 text-center text-gray-500">Loading Admin Profile...</div>;
  }

  return (
    <div className="p-5 lg:px-20 min-h-screen">
      <div className="flex flex-col items-center justify-center pb-10">
        <Avatar sx={{ width: 120, height: 120, mb: 2, bgcolor: "primary.dark" }}>
          <SupervisorAccountIcon sx={{ fontSize: 60 }} />
        </Avatar>
        <h1 className="text-3xl font-bold">{user.fullName || "System Administrator"}</h1>
        <p className="text-gray-500">{user.email}</p>
        <span className="mt-2 px-4 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 shadow-sm border border-purple-200 uppercase">
          {user.role}
        </span>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Personal Details Card */}
        <Card className="p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <ContactMailIcon color="primary" />
            <h2 className="text-xl font-bold">Administrator Info</h2>
          </div>
          <Divider sx={{ mb: 3 }} />
          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span className="font-semibold">Full Name</span>
              <span>{user.fullName || "-"}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span className="font-semibold">Email Directory</span>
              <span className="font-mono">{user.email}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span className="font-semibold">Registered Mobile</span>
              <span>{user.mobile || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span className="font-semibold">Authentication Level</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{user.role}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
