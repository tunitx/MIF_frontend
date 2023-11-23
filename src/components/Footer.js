import React from "react";
import marwadi_logo from "../../assests/images/marwari_logo_pro.png";

const Footer = () => {
  return (
    <div className="w-full flex flex-col bg-[#5C5D5C] text-[#F6F7F8] sm:items-center">
      <div className="w-full flex flex-col sm:flex-row px-5 py-16 gap-8 max-w-6xl">
        <div className="w-full flex justify-center flex-col  gap-4 sm:justify-start items-center">
          <img
            src={marwadi_logo}
            alt="marwadi-logo"
            className="max-w-[282px] h-auto"
          />

          <p className="text-white font-PlayFair text-xl font-bold text-center">
            Follow Us
          </p>
          <div className="w-full flex gap-4 justify-center">
            {/* svgs of the socials */}

            <a
              href={`https://www.facebook.com/profile.php?id=100093420788333&mibextid=ZbWKwL`}
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.3em"
                viewBox="0 0 512 512"
                fill="#f0d2d2"
                className="group-hover:fill-white"
              >
                {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
              </svg>
            </a>

            <a href={`https://twitter.com/marwadiif`} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.3em"
                viewBox="0 0 512 512"
                fill="#f0d2d2"
                className="group-hover:fill-white"
              >
                {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
              </svg>
            </a>

            <a
              href={`https://www.youtube.com/@marwadiinternationalfedration`}
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.3em"
                viewBox="0 0 448 512"
                fill="#f0d2d2"
                className="group-hover:fill-white"
              >
                {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
            </a>

            <a target="_blank" href="https://g.page/r/Cdh0sCA87LolEAI/review">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.3em"
                viewBox="0 0 488 512"
                fill="#f0d2d2"
              >
                {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/marwadiinternationalfederation/"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.3em"
                viewBox="0 0 448 512"
                fill="#f0d2d2"
                className="group-hover:fill-white"
              >
                {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="w-full flex justify-center flex-col text-center gap-2 sm:justify-start">
          <p className="font-semibold font-Poppins text-xl ">
            <strong>Quick Links</strong>
          </p>
          <ul className=" font-Poppins text-base flex flex-col">
            <li>About</li>
            <li>Press</li>
            <li>Network</li>
            <li>Gallery</li>
            <li>Members</li>
            <li>Publication</li>
          </ul>
        </div>
        <div className="font-Poppins flex flex-col gap-8 sm:justify-start">
          <div className="flex flex-col justify-center gap-1 text-center">
            <p className="font-semibold font-Poppins text-xl">
              <strong>Contact Us</strong>
            </p>
            <p>
              <strong>Email: </strong> marwadiif@gmail.com
            </p>
            <p>
              <strong>Contact: </strong> +91 9314503871
            </p>
            <p>
              <strong>Address: </strong> ABHYAM, C-121 A, Lal Kothi Opp Jyoti
              Nagar Thana, near Rajasthan Vidhan Sabha, Jaipur, Rajasthan 302015
            </p>
          </div>
          <div>
            <p className="text-center"> Total Users : 5737</p>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#020c1d] flex justify-center">
        <div className=" flex flex-col gap-2 px-[5px] py-5 text-center md:flex-row md:justify-between md:px-10 w-full max-w-6xl">
          <div>
            <p className="text-[#225a9d] text-[15px]">
              Copyright © 2023 Marwadi International Federation
            </p>
          </div>
          <div>
            <span className="text-[#263b78] text-[14px]">
              Designed and Developed by{" "}
              <a className="text-[#ff0000]">Khojo Right Now</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;