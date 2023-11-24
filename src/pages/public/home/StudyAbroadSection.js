import React from "react";
import { Link } from "react-router-dom";

const StudyAbroadSection = ({ knowMore }) => {
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
          {knowMore ? (
            <Link to="/study-abroad">
              <button className="flex  justify-center max-w-[200px] rounded-md bg-[#EF4D48] px-8 py-3 text-lg font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 ">
                Know More
              </button>
            </Link>
          ) : null}
          <a href="https://forms.gle/AgU3C5EoZbP2W1dL6" target="_blank">
            <button className="flex  justify-center max-w-[200px] rounded-md bg-[#EF4D48] px-8 py-3 text-lg font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 ">
              Consent
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StudyAbroadSection;
