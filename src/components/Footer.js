import React from "react";
import marwadi_logo from "../../assests/images/marwadi_logo.png";

const Footer = () => {
  return (
    <div className="w-full flex flex-col bg-[#5C5D5C] text-[#F6F7F8] sm:items-center">
      <div className="w-full flex flex-col sm:flex-row px-5 py-16 gap-8 max-w-6xl">
        <div className="w-full flex justify-center flex-col  gap-2 sm:justify-start items-center">
          <img
            src={marwadi_logo}
            alt="marwadi-logo"
            className="max-w-[282px] h-auto"
          />
          <p className="text-white font-PlayFair text-xl font-bold text-center">
            Follow Us
          </p>
          <div>{/* svgs of the socials */}</div>
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
        <div className=" flex flex-col gap-2 px-[5px] py-3 text-center md:flex-row md:justify-between md:px-10 w-full max-w-6xl">
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
