import React from "react";
import heartgif from "../../assests/gif/Beating hearts.gif";

const MatrimonyLoader = () => {
  return (
    <div className=" z-[100] fade-in opacity-100 fixed flex flex-col justify-center gap-8 items-center w-screen h-screen top-0 left-0 bg-[#323233] bg-opacity-90 overflow-x-auto py-5 px-5">
      <div className="w-full flex flex-col gap-8 justify-center items-center">
        <div className="flex justify-center items-center gap-6 flex-col">
          <img src={heartgif} className="w-32 h-32 rounded-lg" />
          <p className="font-Poppins w-full text-center font-semibold text-base text-white">
            Please wait while we are submitting your data...
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatrimonyLoader;
