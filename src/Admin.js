import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./components/admin/AdminNavbar";

const Admin = () => {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
    </div>
  );
};

export default Admin;
