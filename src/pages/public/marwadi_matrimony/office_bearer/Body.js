import React, { useState, useEffect } from "react";
import { usePagination } from "../../../../hooks/usePagination";
import { GET_ALL_BEARER } from "../../../../utils/constants";
import Table from "./Table";

const Body = () => {
  const [sortName, setSortName] = useState(null);
  const [sortSamaj, setSortSamaj] = useState(null);

  const [searchFor, setSearchFor] = useState("");

  const [membersList, setMembersList] = useState([]);

  const [filteredList, setFilteredList] = useState(membersList);
  console.log(filteredList);

  useEffect(() => {
    async function getBearers() {
      try {
        const resBody = await fetch(GET_ALL_BEARER);

        const resData = await resBody.json();

        //   console.log(resData);
        return resData;
      } catch (e) {
        console.log(e);
      }
    }

    getBearers().then((data) => {
      setMembersList(data);
    });
  }, []);

  useEffect(() => {
    const list = membersList?.map((member) => {
      return { ...member, samaj: member?.samaj?.name };
    });
    setFilteredList(list);
    handlePageChange({ selected: 0 });
  }, [membersList]);

  //   For Searching

  function search(str) {
    const updatedList = membersList?.filter((items, index) => {
      return (
        items.name.toLowerCase().includes(str.toLowerCase()) ||
        items.samaj.toLowerCase().includes(str.toLowerCase())
      );
    });
    setFilteredList(updatedList);
  }

  useEffect(() => {
    search(searchFor);
  }, [searchFor]);

  //   For Pagination

  const { currentPage, handlePageChange, currentItems, totalPages } =
    usePagination(() => {
      return 5;
    }, filteredList);

  return (
    <div className="w-full py-12 flex justify-center items-center">
      <div className="w-full max-w-6xl flex flex-col gap-8 items-center">
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
            samajSorting={{
              sortSamaj: sortSamaj,
              setSortSamaj: setSortSamaj,
            }}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            currentItems={currentItems}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Body;
