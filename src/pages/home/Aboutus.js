import React from "react";

const Aboutus = () => {
  return (
    <div className="flex px-5 py-12 justify-center w-full">
      <div className="w-full  px-5 py-12 flex flex-col justify-center gap-6 max-w-6xl shadow-box_shadow_marwadi rounded-lg border-b-[5px] border-[#EF4D48]">
        <h2 className="text-center text-2xl sm:text-3xl lg:text-5xl font-bold font-PlayFair">
          About Us
        </h2>
        <h3 className="text-center text-xl sm:text-2xl lg:text-3xl font-bold font-PlayFair mb-7">
          Marwadi International Federation
        </h3>
        <div className="flex flex-col gap-6">
          <p className="text-[#484444] font-Poppins text-sm sm:text-md lg:text-lg  font-medium">
            Marwadi International Federation is a non-profit organization
            registered by the Government of India. “Marwadi International
            Federation” ( MIF ) is an organization formed with the objective of
            developing cultural, social , economic and industrial development
            harmony among the Rajasthani’s including those living in and outside
            Rajasthan .
          </p>
          <p className="text-[#484444] font-Poppins text-sm sm:text-md lg:text-lg font-medium">
            The main objective of this organization is to promote social,
            cultural, trade and business among the people of Rajasthan.&nbsp;The
            foundation of Rajasthan’s glorious history and bright future has
            been laid by its artisans, confectioners and businessmen.
          </p>
        </div>
        {/* image carousel */}
        <div className="image_carousel_for_about_us w-full flex justify-center mt-4">
          <button className="flex w-full justify-center max-w-[200px] rounded-md bg-[#EF4D48] px-12 py-5 text-lg font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
