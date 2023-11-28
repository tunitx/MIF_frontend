import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../../components/matrimony/Header";

const Matrimony = () => {
  return (
    <div className=" flex flex-col  items-center  relative bg-fixed bg-matrimony bg-cover bg-center bg-no-repeat">
      <div className="background-overlay-matrimony z-30"></div>
      <div className="w-full z-50">
        <Header />

        <Outlet />
      </div>
    </div>
  );
};

export default Matrimony;
