import React, { useContext, useEffect, useState } from "react";
import Table from "./Table";
// import {
//   trusteeMembers,
//   advisoryMembers,
//   activeLifeMembers,
// } from "../../utils/constants";
import MembersContext from "../../utils/context/Members";

const Body = () => {
  const { membersList, setMembersList } = useContext(MembersContext);

  const [trusteeMembers, setTrustee] = useState([]);
  const [advisoryMembers, setAdvisory] = useState([]);
  const [activeLifeMembers, setActive] = useState([]);

  const [showList, setShowList] = useState(trusteeMembers);
  const [filteredList, setFilteredList] = useState(showList);

  const [searchFor, setSearchFor] = useState("");

  const [sortName, setSortName] = useState(null);
  const [sortProfession, setSortProfession] = useState(null);

  function search(str) {
    const updatedList = showList.filter((items, index) => {
      return (
        items.name.toLowerCase().includes(str.toLowerCase()) ||
        items.profession.toLowerCase().includes(str.toLowerCase())
      );
    });
    setFilteredList(updatedList);
  }

  useEffect(() => {
    setFilteredList(showList);
  }, [showList]);

  useEffect(() => {
    search(searchFor);
  }, [searchFor]);

  useEffect(() => {
    async function getMembers() {
      const resBody = await fetch("http://localhost:3000/getMemberDetails");

      const resData = await resBody.json();

      //   console.log(resData);
      return resData;
    }
    getMembers().then((data) => {
      // console.log(data);
      let listAdvisory = data.filter((d) => {
        return d.memberType === "advisoryMember";
      });
      //   console.log(list);
      setAdvisory(listAdvisory);

      let listActive = data.filter((d) => {
        return d.memberType === "activeMember";
      });

      setActive(listActive);

      let listTrustee = data.filter((d) => {
        return d.memberType === "trusteeMember";
      });

      setTrustee(listTrustee);

      setShowList(listTrustee);
      setFilteredList(listTrustee);
    });
  }, [membersList]);

  function handleShowListChange(list) {
    setShowList(list);
  }

  return (
    <div className="w-full py-12 flex justify-center items-center">
      <div className="w-full max-w-6xl flex flex-col gap-8 items-center">
        <div className="flex flex-col w-full pb-6 sm:flex-row">
          <div className="w-full flex">
            <button
              className={`w-full border  border-[#EF4D48] rounded-xl text-sm sm:text-base py-3 md:py-4 font-Poppins hover:cursor-pointer ${
                showList === trusteeMembers
                  ? "bg-[#EF4D48] text-white"
                  : " bg-[#FFFFFF] text-[#333]"
              }`}
              onClick={() => {
                if (showList !== trusteeMembers) {
                  setShowList(trusteeMembers);
                }
              }}
            >
              Trustee Members
            </button>
            <button
              className={`w-full border border-[#EF4D48] rounded-xl  py-3 md:py-4  text-sm sm:text-base font-Poppins hover:cursor-pointer ${
                showList === advisoryMembers
                  ? "bg-[#EF4D48] text-white"
                  : "bg-[#FFFFFF] text-[#333]"
              }`}
              onClick={() => {
                if (showList !== advisoryMembers) {
                  setShowList(advisoryMembers);
                }
              }}
            >
              Advisory Members
            </button>
          </div>
          <div className="w-full sm:w-1/2">
            <button
              className={`w-full border  border-[#EF4D48] rounded-xl py-3 md:py-4 text-sm sm:text-base font-Poppins hover:cursor-pointer ${
                showList === activeLifeMembers
                  ? "bg-[#EF4D48] text-white"
                  : "bg-[#FFFFFF] text-[#333]"
              }`}
              onClick={() => {
                if (showList !== activeLifeMembers) {
                  setShowList(activeLifeMembers);
                }
              }}
            >
              Active Life Members
            </button>
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
          />
        </div>
      </div>
    </div>
  );
};

export default Body;
