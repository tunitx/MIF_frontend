import React from "react";

const StudyAbroad = () => {
  return (
    <div className="w-full bg-globe_study bg-top bg-no-repeat bg-cover flex justify-center px-5">
      <div className="max-w-6xl flex flex-col gap-6 py-8">
        <p className="text-white text-2xl font-Poppins text-center font-medium">
          Study with Scholarship in the top universities around the World &
          Earn.
          <br />
          Reach out to us NOW !!!
        </p>
        <div className="flex gap-3 justify-center">
          <button className="flex  justify-center max-w-[200px] rounded-md bg-[#EF4D48] px-8 py-3 text-lg font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 ">
            Know More
          </button>
          <button className="flex  justify-center max-w-[200px] rounded-md bg-[#EF4D48] px-8 py-3 text-lg font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 ">
            Consent
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyAbroad;
