import React from "react";
import { useNavigate } from "react-router-dom";

const Popup = ({ message, redirect, buttontext }) => {
  const navigate = useNavigate();

  return (
    <div className=" z-50 fixed flex flex-col justify-center gap-8 items-center w-screen h-screen top-0 left-0 bg-[#323233] backdrop-blur-sm bg-opacity-90 overflow-x-auto py-5 px-5">
      <div className="w-full flex flex-col gap-8 justify-center items-center">
        <div className="shadow-xl fade-in bg-[#f7f3f5] rounded-md p-8 flex max-w-full w-fit flex-col justify-center items-center gap-5">
          <p className="text-xl font-Poppins text-center">{message}</p>

          <button
            className="group flex w-full items-center gap-2 justify-center max-w-[150px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 "
            onClick={() => {
              navigate(`${redirect}`);
            }}
          >
            {buttontext}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
