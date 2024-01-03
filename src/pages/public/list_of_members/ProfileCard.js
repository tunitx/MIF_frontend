import React from "react";
import { capitalizeSentence } from "../../../utils/helper";

const ProfileCard = ({ data, showCard, setShowCard }) => {
  const {
    address,
    email,
    memberType = "not_available",
    samaj = "not_available",
    name,
    nativePlace,
    phoneNumber,
    profession,
    pfp,
  } = data;
  console.log(memberType);
  return (
    <div className=" z-50 fixed flex flex-col justify-center gap-8 items-center w-screen h-screen top-0 left-0 bg-[#323233] bg-opacity-90 overflow-x-auto py-5 px-5">
      <div className="w-full flex flex-col gap-8 justify-center items-center">
        <div
          className="self-end flex justify-end pr-5 sm:pr-20 hover:cursor-pointer group mt-5"
          onClick={() => {
            setShowCard(null);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2em"
            viewBox="0 0 384 512"
            fill="#fff"
            className="group-hover:fill-[#EF4D48]"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </div>
        <div className="w-full  border-4 rounded-b-xl border-[#EF4D48] font-Poppins max-w-md  min-w-[350px] box-border  bg-gradient-to-r from-[#FFDD57] to-[#FE954C]">
          <div className="flex justify-center items-center w-full rounded-b-2xl bg-[#EF4D48] p-3">
            <h1 className="text-[#fff] font-semibold text-xl sm:text-2xl font-Poppins w-full text-center whitespace-nowrap">
              {memberType !== "not_available" && memberType.name.toUpperCase()}
              {samaj !== "not_available" && samaj.toUpperCase()}
            </h1>
          </div>
          <div className="w-full p-5 flex justify-center items-center flex-col gap-4">
            <div className="w-fit  rounded-lg  shadow-box_shadow_marwadi_LOM">
              <img
                src={pfp}
                alt=""
                className=" rounded-lg w-36 h-36 sm:w-40 sm:h-40"
              />
            </div>
            <div className="w-full flex flex-col gap-1 justify-center items-center">
              <p className=" w-full text-xl sm:text-[28px] font-bold text-[#EF4D48]  text-center">
                {capitalizeSentence(name)}
              </p>
              <h3 className="text-lg sm:text-xl font-medium text-[#444] text-center">
                {capitalizeSentence(profession)}
              </h3>
            </div>
            <div className="w-full flex gap-4 justify-center items-center">
              <a href={`tel:${phoneNumber}`} className="w-[40%]">
                <button
                  className={`group w-full border flex justify-center gap-3 px-4 items-center border-[#EF4D48] rounded-full text-sm sm:text-base py-3 md:py-4 font-Poppins hover:cursor-pointer hover:bg-[#EF4D48] hover:text-white`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                    fill="#EF4D48"
                    className="group-hover:fill-white"
                  >
                    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                  </svg>

                  <p className="font-medium whitespace-nowrap">Phone</p>
                </button>
              </a>
              <a href={`mailto:${email}`} className="w-[40%]">
                <button
                  className={`group w-full border flex  justify-center items-center px-4 gap-3 border-[#EF4D48] rounded-full  py-3 md:py-4  text-sm sm:text-base font-Poppins hover:cursor-pointer hover:bg-[#EF4D48] hover:text-white`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                    fill="#EF4D48"
                    className="group-hover:fill-white"
                  >
                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                  </svg>

                  <p className="font-medium whitespace-nowrap">E-mail</p>
                </button>
              </a>
            </div>
            <div className="w-full">
              <div className="flex gap-3 items-start w-full text-xl font-medium py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.2em"
                  viewBox="0 0 384 512"
                  fill="#EF4D48"
                >
                  <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                </svg>
                <p className="font-base text-xl">Address</p>{" "}
              </div>
              <p className="pl-3 w-full text-sm justify-center">{address}</p>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center  bg-[#EF4D48] rounded-b-lg  box-border rounded-t-2xl mt-5 py-[7px]">
            <p className="text-lg font-medium ">Native Place</p>
            <p className="text-xl font-semibold text-white">{nativePlace}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
