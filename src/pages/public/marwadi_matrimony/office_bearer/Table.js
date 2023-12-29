import React, { useState } from "react";
import { sortAscending, sortDescending } from "../../../../utils/sort";
import ProfileCard from "../../list_of_members/ProfileCard";
import { capitalizeSentence } from "../../../../utils/helper";
import ReactPaginate from "react-paginate";

const Table = ({
  data,
  setFilteredList,
  nameSorting,
  samajSorting,
  totalPages,
  handlePageChange,
  currentItems,
  currentPage,
}) => {
  const { sortName, setSortName } = nameSorting;
  const { sortSamaj, setSortSamaj } = samajSorting;

  const [showCard, setShowCard] = useState(null);

  function sortHandler(sortBasedOn, sortFashion, setSortFashion) {
    if (sortFashion === null || sortFashion === "descending") {
      sortAscending(sortBasedOn, data, setFilteredList);
      setSortFashion("ascending");
    } else {
      sortDescending(sortBasedOn, data, setFilteredList);
      setSortFashion("descending");
    }
  }
  // console.log(data);

  return (
    <div className="overflow-x-auto w-full flex flex-col gap-16">
      <div className="overflow-x-auto w-full">
        <table className="w-full border-2 border-[#305D2B]">
          <thead className="w-full">
            <tr className="bg-[#305D2B] text-white w-full">
              {/* Samaj */}

              <th className="p-3 text-center border-white border-r font-bold font-Poppins  w-1/3">
                <div
                  className="w-full flex items-center hover:cursor-pointer"
                  onClick={() => {
                    sortHandler("samaj", sortSamaj, setSortSamaj);
                  }}
                >
                  <p className="w-full">Samaj</p>
                  <div>
                    {sortSamaj === null ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 320 512"
                        fill="#fff"
                      >
                        <path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" />
                      </svg>
                    ) : null}
                    {sortSamaj === "ascending" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 320 512"
                        fill="#fff"
                      >
                        <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                      </svg>
                    ) : (
                      ""
                    )}

                    {sortSamaj === "descending" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 320 512"
                        fill="#fff"
                      >
                        <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
                      </svg>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </th>

              {/* Name */}

              <th className="p-3 text-center border-white border-r font-bold font-Poppins  w-1/3">
                <div
                  className="w-full flex items-center hover:cursor-pointer"
                  onClick={() => {
                    sortHandler("name", sortName, setSortName);
                  }}
                >
                  <p className="w-full">Name</p>
                  <div>
                    {sortName === null ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 320 512"
                        fill="#fff"
                      >
                        <path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" />
                      </svg>
                    ) : null}
                    {sortName === "ascending" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 320 512"
                        fill="#fff"
                      >
                        <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                      </svg>
                    ) : (
                      ""
                    )}

                    {sortName === "descending" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 320 512"
                        fill="#fff"
                      >
                        <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
                      </svg>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </th>

              <th className="p-3 text-center w-1/3 whitespace-nowrap font-bold font-Poppins">
                <p className="w-full"> View More</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((item, index) => (
              <tr key={index} className="border-b border-[#EF4D48] w-full">
                <td className="p-2 border-r border-[#EF4D48]  text-center w-1/3  text-[#333] whitespace-nowrap font-Poppins font-medium ">
                  {capitalizeSentence(item.samaj)}
                </td>
                <td className="p-2 border-r border-[#EF4D48]  text-center w-1/3  text-[#333] whitespace-nowrap font-bold font-Poppins">
                  {item.name.toUpperCase()}
                </td>
                <td className="p-2  text-center w-full whitespace-nowrap px-auto flex justify-center items-center hover:cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.7em"
                    viewBox="0 0 576 512"
                    fill="#EF4D48"
                    onClick={() => {
                      setShowCard(item);
                    }}
                  >
                    <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 256h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}

        <div className="w-full flex items-center flex-col sm:flex-row justify-start gap-4 sm:justify-between mt-5">
          {totalPages > 1 && (
            <ReactPaginate
              forcePage={currentPage}
              pageCount={totalPages}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              containerClassName={
                "flex justify-center items-center gap-6 font-Poppins text-sm text-[#333]  rounded-md p-3"
              }
              pageClassName={"font-bold"}
              activeClassName={"bg-[#EF4D48] text-white rounded-md py-2 px-4"}
              disabledClassName={
                "hover:cursor-not-allowed fill-gray-500 hidden"
              }
              previousLabel={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.4rem"
                  viewBox="0 0 320 512"
                  fill="#EF4D48"
                >
                  <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
              }
              // className="flex hover:cursor-not-allowed w-full  justify-center font-Poppins text-sm text-[#333] gap-2 items-center "
              nextLabel={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.4rem"
                  fill="#EF4D48"
                  viewBox="0 0 320 512"
                >
                  <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                </svg>
              }
            />
          )}
          {totalPages >= 1 ? (
            <p className="text-base w-full text-center sm:text-right tracking-wide font-Poppins text-[#333] font-semibold">
              Page : {currentPage + 1} of {totalPages}
            </p>
          ) : (
            <p className="text-base w-full text-center sm:text-right tracking-wide font-Poppins text-[#333] font-semibold">
              Page : {currentPage} of {totalPages}
            </p>
          )}
        </div>
      </div>
      {showCard && (
        <ProfileCard
          data={showCard}
          showCard={showCard}
          setShowCard={setShowCard}
        />
      )}
    </div>
  );
};

export default Table;
