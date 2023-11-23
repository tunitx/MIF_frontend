import React from "react";

const Header = () => {
  return (
    <div className="w-full p-5 relative flex justify-center">
      <div className="max-w-6xl w-full flex flex-col gap-2">
        <h2 className="text-[#EF4D48] text-3xl font-Poppins font-semibold w-full text-center md:text-3xl lg:text-4xl mb-6">
          Marwadi Vyapari
        </h2>
        <p className="text-[#2B161B]   text-base sm:text-lg w-full text-center font-Poppins">
          By: <strong>Dr. GIRIJA SHANKAR</strong>
        </p>
        <p className="text-[#2B161B]  text-base sm:text-lg w-full text-center font-Poppins">
          Courtesy: <strong>Krishna Jansevi & Co., Bikaner</strong>
        </p>
        <div className="w-full mt-12 mb-10">
          <iframe
            src="https://drive.google.com/file/d/1yVzHRIwTiUP-mUeO_TS-vfjKn1OK2i24/preview"
            allow="autoplay"
            className="w-full h-auto min-h-[764px]"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Header;
