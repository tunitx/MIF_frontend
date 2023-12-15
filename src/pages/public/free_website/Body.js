import React from "react";
import benefits1 from "../../../../assests/images/benefits1.png.webp";
import benefits2 from "../../../../assests/images/benefits2.webp";
import benefits3 from "../../../../assests/images/benefits3.webp";
import CarouselImage from "../../../components/CarouselImage";
import Carousel from "react-multi-carousel";
import { responsive } from "../../../utils/constants";

const Body = () => {
  const slides = [benefits1, benefits2, benefits3];
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className=" w-full flex flex-col justify-center items-center gap-6 sm:gap-8 max-w-6xl mb-8 p-5">
        <p className="text-[#EF4D48] font-bold text-3xl font-PlayFair w-full text-center md:text-4xl lg:text-5xl ">
          Benefits
        </p>
        <div className="w-full flex justify-center items-center">
          <div className="w-full gap-16 flex flex-col justify-center sm:flex-row sm:justify-evenly">
            <ul className="text-lg font-Poppins flex flex-col gap-2 justify-center mx-auto sm:text-xl grow w-full">
              <li className="w-full text-center flex gap-3 justify-start items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
                <p className="w-full whitespace-nowrap text-left">
                  {" "}
                  Digital Interaction
                </p>
              </li>
              <li className="w-full text-center flex gap-3 justify-start items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
                <p className="w-full whitespace-nowrap text-left">
                  {" "}
                  24/7 Availability
                </p>
              </li>
              <li className="w-full text-center flex gap-3 justify-start items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
                <p className="w-full whitespace-nowrap text-left">
                  {" "}
                  Easy Info Sharing
                </p>{" "}
              </li>
              <li className="w-full text-center flex gap-3 justify-start items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
                <p className="w-full whitespace-nowrap text-left">
                  {" "}
                  Local to Global Reach
                </p>{" "}
              </li>
              <li className="w-full text-center flex gap-3 justify-start items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
                <p className="w-full whitespace-nowrap text-left">
                  {" "}
                  Professional Look
                </p>
              </li>
            </ul>
            <div className="w-full flex justify-center items-center">
              <CarouselImage slides={slides} />
            </div>
          </div>
        </div>
        <div className="w-full justify-center flex">
          <button className="flex  justify-center max-w-[200px] rounded-md bg-[#EF4D48] px-5 py-3 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 ">
            <a href="https://app.khojorightnow.com/" target="_blank">
              Create Your Free Profile
            </a>
          </button>
        </div>
      </div>
      <div className="w-full bg-[#E04356] text-white font-PlayFair flex flex-col justify-center items-center gap-4 sm:flex-row py-10">
        <div className="flex flex-col justify-center items-center gap-3 grow">
          <p className="font-bold text-2xl md:text-3xl">Step 1</p>
          <p>Select Theme</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-3 grow">
          <p className="font-bold text-2xl md:text-3xl">Step 2</p>
          <p>Fill your Details</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-3 grow">
          <p className="font-bold text-2xl md:text-3xl">Step 3</p>
          <p>Share Unlimited</p>
        </div>
      </div>
    </div>
  );
};

export default Body;
