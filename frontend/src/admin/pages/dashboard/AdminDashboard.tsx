import React from "react";
import AdminDrawerList from "../../components/AdminDrawerList";
import AdminRoutes from "../../../routes/AdminRoutes";

const AdminDashboard = () => {
    const toggleDrawer = () => {};

  return (
    <div className="lg:flex lg:h-[90vh]">
      <section className="hidden lg:block h-full">
        <AdminDrawerList toggleDrawer={toggleDrawer} />
      </section>
      <section className="p-10 w-full lg:w-[80%] overflow-y-auto">
        <AdminRoutes />
      </section>
    </div>
  );
};

export default AdminDashboard;
