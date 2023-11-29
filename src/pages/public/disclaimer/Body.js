import React from "react";
import { Link } from "react-router-dom";

const Body = () => {
  return (
    <div className="w-full flex justify-center items-center mb-10">
      <div className="w-full max-w-6xl flex justify-center flex-col ">
        <div className="p-5 text-justify flex flex-col gap-5 font-Poppins text-sm  text-[#333]">
          <p>
            The content displayed on the Marwadi International Federation
            website is protected by intellectual property rights. Any reuse,
            republishing, or reprinting of such content without our prior
            written consent is strictly prohibited. The information presented on
            this website is intended solely for educational and informational
            purposes.
          </p>
          <p>
            Although we have taken reasonable measures to ensure the accuracy of
            the information on our website, we cannot guarantee its completeness
            or correctness. Through our website, you may be able to access other
            websites that are beyond our control. We are not responsible for the
            nature, content, or availability of such sites. The inclusion of
            links to other websites does not imply a recommendation or
            endorsement of the views expressed therein.
          </p>
          <p>
            Therefore, any reliance you place on the information provided on
            this website is at your own risk. Marwadi International Federation
            shall not be held liable for any financial loss or damage, including
            indirect or consequential loss or damage, or any loss or damage
            arising from the loss of data or profits, resulting from the use of
            this website.
          </p>
        </div>
        <Link
          to={
            "https://drive.google.com/file/d/1K14_vLWxv0brebZL9dkqoHIHAfn5s_aD/view?usp=sharing"
          }
          className="w-full mx-auto flex justify-center"
        >
          <button className="flex w-full justify-center max-w-[120px] rounded-md bg-[#EF4D48] px-2 py-2 text-lg font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 ">
            I agree
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Body;
