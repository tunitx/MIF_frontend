import React, { useState, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./components/admin/AdminNavbar";
import AdminContext from "./utils/context/Admincontext";
import Signin from "./components/admin/Signin";

const Admin = () => {
  const [admin, setAdmin] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const local_admin = JSON.parse(localStorage.getItem("admin"));

    if (local_admin) {
      setAdmin(local_admin);
    }
    setChecked(true);
  }, []);
  if (!checked) return <div></div>;

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      <div>
        <AdminNavbar />

        {admin ? <Outlet /> : <Signin />}
      </div>
    </AdminContext.Provider>
  );
};

export default Admin;
