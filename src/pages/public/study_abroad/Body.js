import React from "react";
import { Link } from "react-router-dom";

const Body = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="mt-12 w-full flex flex-col justify-center items-center gap-4 sm:gap-5 max-w-6xl mb-8">
        <p className="text-[#EF4D48] font-semibold text-3xl font-Poppins w-full text-center md:text-4xl ">
          Empowering Youth & Foreign Education
        </p>
        <p className="w-full text-[#444] text-center text-lg font-medium font-Poppins sm:text-xl">
          Study & Earn in Abroad with MIF
        </p>
        <div className="w-full p-5 flex flex-col gap-8">
          <iframe
            src="https://drive.google.com/file/d/1RstFI0ZOmXwqHmg6iMIQPc3xPvCX6T4Q/preview"
            allow="autoplay"
            className="w-full h-auto min-h-[512px]"
          ></iframe>
          <div className="w-full justify-center flex">
            <Link to="/disclaimer">
              <button className="flex  justify-center max-w-[200px] rounded-md bg-[#EF4D48] px-8 py-3 text-lg font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 ">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
