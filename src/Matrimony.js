import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/matrimony/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/matrimony/Footer";
import Footer from "./components/Footer";

const Matrimony = () => {
  return (
    <div className=" flex flex-col min-h-screen relative bg-fixed bg-matrimony bg-cover bg-center bg-no-repeat">
      <div className="background-overlay-matrimony z-30"></div>
      {/* <div className="background_image absolute w-screen h-screen bg-fixed bg-matrimony bg-cover bg-center opacity-25 bg-no-repeat"></div> */}
      {/* <Navbar /> */}
      <div className="z-50">
        <Navbar />
        <Header />
        <Outlet />
        <Footer />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Matrimony;
