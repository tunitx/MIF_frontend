import React, { useState } from "react";
import FormAddNewMember from "./FormAddNewMember";
import { Outlet } from "react-router-dom";
import FormAddMemberType from "./FormAddMemberType";
import Members from "./Members";
import Presses from "../press/Allpress";
import Advertisements from "../advertisment-board/Advertisements";

const ListOfMembers = () => {
  const [show, setShow] = useState("addMember");

  return (
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
          <button
            onClick={() => {
              setShow("allAdvertisements");
            }}
            className="flex w-full justify-center max-w-[210px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 whitespace-nowrap"
          >
            All advertisements
          </button>

        </div>
      </div>
      {/* {show === "addMember" ? <FormAddNewMember /> : show === "addMemberType" ? <FormAddMemberType /> : <Members />} */}
      {
  show === "addMember" ? <FormAddNewMember /> :
  show === "addMemberType" ? <FormAddMemberType /> :
  show === "allPress" ? <Presses /> :
  show === "allAdvertisements" ? <Advertisements /> :
  <Members />
}
    </div>
  );
};

export default ListOfMembers;
