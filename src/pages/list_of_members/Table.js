import React from "react";
import { sortAscending, sortDescending } from "../../utils/sort";

const Table = ({ data, setFilteredList, nameSorting, professionSorting }) => {
  const { sortName, setSortName } = nameSorting;
  const { sortProfession, setSortProfession } = professionSorting;

  function sortHandler(sortBasedOn, sortFashion, setSortFashion) {
    if (sortFashion === null || sortFashion === "descending") {
      sortAscending(sortBasedOn, data, setFilteredList);
      setSortFashion("ascending");
    } else {
      sortDescending(sortBasedOn, data, setFilteredList);
      setSortFashion("descending");
    }
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-2 border-[#305D2B]">
        <thead className="w-full">
          <tr className="bg-[#305D2B] text-white w-full">
            <th className="p-3 text-center border-white border-r font-bold font-Poppins  w-1/3">
              <div className="w-full flex items-center">
                <p
                  className="w-full"
                  onClick={() => {
                    sortHandler("name", sortName, setSortName);
                  }}
                >
                  Name
                </p>
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
            <th className="p-3 text-center border-white border-r font-bold font-Poppins  w-1/3">
              <div className="w-full flex items-center">
                <p
                  className="w-full"
                  onClick={() => {
                    sortHandler(
                      "profession",
                      sortProfession,
                      setSortProfession
                    );
                  }}
                >
                  Profession
                </p>
                <div>
                  {sortProfession === null ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 320 512"
                      fill="#fff"
                    >
                      <path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z" />
                    </svg>
                  ) : null}
                  {sortProfession === "ascending" ? (
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

                  {sortProfession === "descending" ? (
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
          {data.map((item, index) => (
            <tr key={index} className="border-b border-[#EF4D48] w-full">
              <td className="p-2 border-r border-[#EF4D48]  text-center w-1/3  text-[#333] whitespace-nowrap font-bold font-Poppins">
                {item.name}
              </td>
              <td className="p-2 border-r border-[#EF4D48]  text-center w-1/3  text-[#333] whitespace-nowrap font-Poppins font-medium ">
                {item.profession}
              </td>
              <td className="p-2  text-center w-1/3  whitespace-nowrap">
                View More
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
