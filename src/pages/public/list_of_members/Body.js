import React, { useContext, useEffect, useState } from "react";
import Table from "./Table";
// import {
//   trusteeMembers,
//   advisoryMembers,
//   activeLifeMembers,
// } from "../../utils/constants";
import MembersContext from "../../../utils/context/Members";

import {
  GET_ALL_MEMBER,
  GET_AVAILABLE_MEMBERTYPES_LIST,
} from "../../../utils/constants";
import { usePagination } from "../../../hooks/usePagination";

const Body = () => {
  const [showList, setShowList] = useState([]);
  const [filteredList, setFilteredList] = useState(showList);

  const [membersList, setMembersList] = useState([]);

  const [memberTypeList, setMemberTypeList] = useState([]);

  const [searchFor, setSearchFor] = useState("");

  const [sortName, setSortName] = useState(null);
  const [sortProfession, setSortProfession] = useState(null);

  function search(str) {
    const updatedList = showList?.filter((items, index) => {
      return (
        items.name.toLowerCase().includes(str.toLowerCase()) ||
        items.profession.toLowerCase().includes(str.toLowerCase())
      );
    });
    setFilteredList(updatedList);
  }

  // For Pagination

  const { currentPage, handlePageChange, currentItems, totalPages } =
    usePagination(() => {
      return 5;
    }, filteredList);

  useEffect(() => {
    setFilteredList(showList);
    handlePageChange({ selected: 0 });
  }, [showList]);

  useEffect(() => {
    search(searchFor);
  }, [searchFor]);

  // to get the list of members and memberTypes

  useEffect(() => {
    async function getMemberTypes() {
      try {
        const resBody = await fetch(GET_AVAILABLE_MEMBERTYPES_LIST);

        const resData = await resBody.json();

        //   console.log(resData);
        return resData;
      } catch (e) {
        console.log(e);
      }
    }

    getMemberTypes().then((data) => {
      setMemberTypeList(data);
    });

    async function getMembers() {
      try {
        const resBody = await fetch(GET_ALL_MEMBER);

        const resData = await resBody.json();

        //   console.log(resData);
        return resData;
      } catch (e) {
        console.log(e);
      }
    }

    getMembers().then((data) => {
      setMembersList(data);
    });
  }, []);

  useEffect(() => {
    const list = membersList?.filter((member) => {
      return member.memberType.id === memberTypeList[0]?.id;
    });

    setShowList(list);
  }, [membersList, memberTypeList]);

  function handleShowListChange(setTo) {
    const list = membersList.filter((member) => {
      return member.memberType.id === setTo;
    });

    setShowList(list);
  }

  return (
    <div className="w-full py-12 flex justify-center items-center">
      <div className="w-full max-w-6xl flex flex-col gap-8 items-center">
        <div className="flex flex-col w-full pb-6 sm:flex-row">
          <div className="w-full flex flex-wrap">
            {memberTypeList &&
              memberTypeList?.map((type, index) => {
                return (
                  <button
                    key={index}
                    className={`w-1/2 sm:w-fit grow min-w-[170px] border  border-[#EF4D48] rounded-xl text-sm sm:text-base py-3 md:py-4 font-Poppins hover:cursor-pointer ${
                      showList[0]?.memberType?.id === type?.id
                        ? "bg-[#EF4D48] text-white"
                        : " bg-[#FFFFFF] text-[#333]"
                    }`}
                    onClick={() => {
                      handleShowListChange(type?.id);
                    }}
                  >
                    {type?.name}
                  </button>
                );
              })}
          </div>
        </div>
        <div className="flex w-full justify-center max-w-5xl">
          <div className="bg-[#EF4D4847] flex items-center justify-center rounded-tl-full rounded-bl-full p-3 px-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </div>

          <input
            type="text"
            value={searchFor}
            onChange={(e) => {
              setSearchFor(e.target.value);
            }}
            placeholder="View Member"
            className="w-full rounded-tr-full rounded-br-full bg-[#EF4D4847] p-3 text-[#7A7A7A] font-Poppins focus:outline focus:outline-[#371c1b47]"
          />
        </div>
        <div className="flex w-full max-w-5xl">
          <Table
            data={filteredList}
            setFilteredList={setFilteredList}
            nameSorting={{ sortName: sortName, setSortName: setSortName }}
            professionSorting={{
              sortProfession: sortProfession,
              setSortProfession: setSortProfession,
            }}
            currentItems={currentItems}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default Body;
