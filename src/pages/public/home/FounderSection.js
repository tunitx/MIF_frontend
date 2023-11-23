import React from "react";
import ca_vijayGarg from "../../../../assests/images/CA_Vijay.jpg";

const FounderSection = () => {
  return (
    <div className="w-full bg-[#5D5D5D] flex justify-center text-white font-PlayFair">
      <div className="w-full flex flex-col  px-5 py-12 sm:flex-row max-w-6xl gap-4 items-center lg:gap-8 xl:gap-10">
        <div className="avatar sm:w-2/5 lg:w-1/4 sm:h-auto sm:self-start grow border-4 rounded-2xl border-[#453E3E] shadow-ca_vijay_shadow">
          <img
            className="avatar_img rounded-2xl sm:w-auto sm:h-full"
            src={ca_vijayGarg}
          ></img>
        </div>
        <div className="flex flex-col gap-6 justify-center sm:w-3/5 lg:w-3/4 ">
          <p className="text-xl text-center sm:text-2xl sm:text-left ">
            Message from Founder, General Secretory
          </p>
          <h2 className="text-2xl font-bold text-center mb-6 sm:text-3xl  lg:text-5xl sm:text-left">
            CA Vijay Garg
          </h2>
          <p className="font-Poppins text-base font-medium">
            “
            <strong className="font-bold">
              Marwadi International Federation
            </strong>
            &nbsp; is an organization formed with the objective of developing
            cultural, social, economic and industrial development harmony among
            the Rajasthani’s including those living in and outside Rajasthan. is
            a unique initiative to keep Rajasthani soil in the hands of all
            these workers who by any means belong to the Rajasthani soil, even
            if he is a resident of this place, whether he is a migrant or a
            foreigner. One and one together are eleven, taking this as the basis
            of the statement, come be a part of MIF and win for all round
            development of Rajasthan.”
          </p>
          <div className="socials">
            <div className="facebook"></div>
            <div className="twitter"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderSection;
