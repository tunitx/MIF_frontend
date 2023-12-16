import React, { useState } from "react";
import ListOfMembers from "../list-of-members/ListOfMembers";
import Members from "../list-of-members/Members";
import Advertisements from "../advertisment-board/Advertisements";
import Presses from "../press/Allpress";
import FormAddNewMember from "../list-of-members/FormAddNewMember";
import FormAddMemberType from "../list-of-members/FormAddMemberType";
import FormAddNewPress from "../press/FormAddNewPress";
import FormAddAdvertisement from "../advertisment-board/FormAddAdvertisment";
const Home = () => {

  const [show, setShow] = useState('');
  return (
    <div className="flex flex-col justify-center items-center gap-16 mt-10">
      <div className="max-w-6xl flex flex-col justify-center items-center text-left gap-4 w-fit">
        <div className="text-gray-900 font-bold text-4xl leading-[2.5rem] tracking-normal font-Poppins w-full">
          Hi there,
        </div>
        <p className="text-[#EF4D48] font-semibold text-4xl tracking-normal font-Poppins w-full">
          Admin
        </p>
        <div className="text-gray-900 font-bold text-2xl leading-[1rem] tracking-normal font-Poppins w-full">
          How are you doing today.
        </div>
      </div>
      <div className="flex flex-col w-full sm:flex-row ">
        <div className="w-full sm:w-1/4 md:1/5 lg:1/6 flex justify-center items-center my-5 sm:border-r-4 sm:border-[#444]">
          <div className="flex flex-col gap-8 justify-center items-center self-start py-8 ">
            <button
              onClick={() => {
                setShow("addMember");
              }}
              className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
            >
              Add Member
            </button>
            <button
              onClick={() => {
                setShow("addMemberType");
              }}
              className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
            >
              Add Member Type
            </button>

            <button
              onClick={() => {
                setShow("allMembers");
              }}
              className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
            >
              All Members
            </button>
            <button
              onClick={() => {
                setShow("allPress");
              }}
              className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
            >
              All Press
            </button>
            {/* <button
              onClick={() => {
                setShow("allAdvertisements");
              }}
              className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
            >
              All advertisements
            </button> */}
            <button
              onClick={() => {
                setShow("addNewPress");
              }}
              className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
            >
              Add Press
            </button>
            <button
              onClick={() => {
                setShow("addAdvertisement");
              }}
              className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
            >
              Add Advertisement
            </button>

          </div>
        </div>
        {/* {show === "addMember" ? <FormAddNewMember /> : show === "addMemberType" ? <FormAddMemberType /> : <Members />} */}
        {
          show === "addMember" ? <FormAddNewMember /> :
            show === "addMemberType" ? <FormAddMemberType /> :
              show === "allPress" ? <Presses /> :
                show === "allAdvertisements" ? <Advertisements /> :
                  show === "allMembers" ? <Members /> :
                    show === "addAdvertisement" ? <FormAddAdvertisement /> :
                      show === "addNewPress" ? <FormAddNewPress /> :
                        null
        }
      </div>



    </div>
  );
};

export default Home;
