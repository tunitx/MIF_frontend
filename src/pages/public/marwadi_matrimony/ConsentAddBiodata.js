import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConsentAddBiodata = ({ setAction }) => {
  const navigate = useNavigate();

  return (
    <div
      className=" z-50 fixed flex flex-col justify-center gap-8 items-center w-screen h-screen  top-0 left-0 bg-[#323233] bg-opacity-90 overflow-x-auto overflow-y-scroll py-5 px-5 "
      onClick={() => {
        setAction(null);
      }}
    >
      <div className="w-full flex flex-col gap-8 justify-center items-center  h-screen rounded-md overflow-y-auto">
        <div
          className="shadow-xl fade-in bg-[#f7f3f5] rounded-md p-8  flex  w-fit flex-col justify-center items-center  overflow-y-auto h-fit gap-7 max-w-3xl "
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <p className="text-sm  font-Poppins font-semibold text-[#444] ">
            By submitting your biodata or personal information on this platform,
            you acknowledge and agree to the following terms:
          </p>

          <ul className="text-sm flex flex-col gap-2 max-h-96 overflow-y-auto list-disc">
            <li>
              Marwadi International Federation and its affiliated members
              operate as a platform acting as a bridge for matrimonial purposes.
              We do not independently verify the accuracy or authenticity of the
              information provided by users.
            </li>
            <li>
              Users are solely responsible for the accuracy, completeness, and
              truthfulness of the information they provide on this platform.
            </li>
            <li>
              Marwadi International Federation and its members do not undertake
              any responsibility for verifying the details provided by users,
              including but not limited to, personal background, identity, or
              any other information shared on this platform.
            </li>
            <li>
              Users are encouraged to exercise caution and discretion while
              interacting with other users and making decisions based on the
              information available on this platform.
            </li>
            <li>
              It is the user's responsibility to update or remove their
              information if it becomes outdated, inaccurate, or if they no
              longer require the services provided by this platform.
            </li>
            <li>
              Marwadi International Federation and its members shall not be
              liable for any consequences arising from the use or reliance on
              the information provided by users on this platform.
            </li>
          </ul>

          {/* {agreed === false ? (
            <p className="fade-in font-Poppins text-sm font-semibold text-red-800">
              Sorry, but you can't go any furthur without agreeing to our T&C.
            </p>
          ) : null} */}

          <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              className="group flex w-full sm:w-fit whitespace-nowrap items-center gap-2 justify-center max-w-[170px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 "
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/matrimony/add-biodata`);
              }}
            >
              Okay, go on.
            </button>
            {/* <button
              className="group flex whitespace-nowrap w-full sm:grow items-center gap-2 justify-center  rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 "
              onClick={() => {
                setAgreed(false);
              }}
            >
              Nah, can't trust you.
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentAddBiodata;
