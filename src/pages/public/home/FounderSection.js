import React from "react";
import ca_vijayGarg from "../../../../assests/images/CA_Vijay.webp";

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
          <div className="socials flex w-full gap-6 px-2">
            <div className="facebook">
              <a href={`https://www.facebook.com/CaVijayKumarGarg/`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.5em"
                  viewBox="0 0 512 512"
                  fill="#f0d2d2"
                  className="group-hover:fill-white"
                >
                  {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                  <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                </svg>
              </a>
            </div>
            <div className="twitter">
              <a href={`https://twitter.com/vijaymgarg`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.5em"
                  viewBox="0 0 512 512"
                  fill="#f0d2d2"
                  className="group-hover:fill-white"
                >
                  {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderSection;
