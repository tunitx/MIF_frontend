import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Advertisment from "./components/Advertisment";

const Public = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <div className="w-full flex justify-center my-10">
        <Advertisment />
      </div>
      <Footer />
    </div>
  );
};

export default Public;
