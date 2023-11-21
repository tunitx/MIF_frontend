import React from "react";
import events1 from "../../../../assests/images/events1.jpeg.webp";

const InternationalMedia = () => {
  return (
    <div className="w-full p-5 relative flex justify-center mt-8">
      <div className="max-w-6xl w-full flex flex-col gap-8 sm:flex-row">
        <div className="flex flex-col gap-8 w-full">
          <h2 className="text-[#EF4D48] font-Lato text-center w-full text-xl font-bold lg:text-2xl">
            International Media @ MIF Office
          </h2>
          <p className="text-center text-[#453E3E] font-Poppins w-full">
            <strong>Mr Ashok Vyas</strong> from Newyork ( Program head of ITV
            gold, Newyork) and <strong>Mr. Govind Prateek</strong>, Additional
            Director of DPR visited Office of Marwadi international federation
            for discussion activities of MIF at National and International
            level.
          </p>
        </div>
        <div>
          <img src={events1} alt="photo" />
        </div>
      </div>
    </div>
  );
};

export default InternationalMedia;
