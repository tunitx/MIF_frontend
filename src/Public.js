import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Advertisment from "./components/Advertisment";
import ReactGA from "react-ga4";

ReactGA.initialize("G-LSQRE31E23");

const Public = () => {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/", title: "MIF Home" });
  }, []);

  return (
    <div className="bg-[#f7f3f5]">
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
