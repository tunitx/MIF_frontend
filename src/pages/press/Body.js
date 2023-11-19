import React, { useEffect, useState } from "react";

import { GET_ALL_PRESS, GET_YEARS_LIST } from "../../utils/constants";
import ImagePreview from "./ImagePreview";

const Body = () => {
  const monthsName = {
    january: "JAN",
    february: "FEB",
    march: "MAR",
    april: "APRIL",
    may: "MAY",
    june: "JUN",
    july: "JUL",
    august: "AUG",
    september: "SEP",
    october: "OCT",
    november: "NOV",
    december: "DEC",
  };

  const [allPress, setALLPress] = useState(null);

  const [showPress, setShowPress] = useState({});

  const [showMonth, setShowMonth] = useState("all");

  const [showYear, setShowYear] = useState(null);

  const [yearsList, setYearsList] = useState([]);

  const [monthsList, setMonthsList] = useState([]);

  const [showImage, setShowImage] = useState(null);

  // console.log(showImage);

  function updatesShowPress(forYear, forMonth) {
    if (forMonth === "all") {
      let temp = JSON.parse(JSON.stringify(showPress));
      temp[forYear] = [...allPress[forYear]];
      setShowPress(temp);
    } else {
      let temp = JSON.parse(JSON.stringify(showPress));
      temp[forYear] = [...allPress[forYear]].filter((item) => {
        return item.month === forMonth;
      });
      setShowPress(temp);
    }
  }

  function structurePressData(allPressData, yearsListData) {
    const structuredData = {};

    for (let year of yearsListData) {
      structuredData[year] = [];
    }

    for (let press of allPressData) {
      structuredData[press.year].push(press);
    }

    return structuredData;
  }

  async function getPress() {
    const resData = await fetch(GET_ALL_PRESS);
    const data = await resData.json();

    const resYearsList = await fetch(GET_YEARS_LIST);
    let resYearsListData = await resYearsList.json();
    resYearsListData = resYearsListData.reverse();

    setYearsList(resYearsListData);

    setShowYear(resYearsListData[0]);

    const structuredData = structurePressData(data, resYearsListData);

    setALLPress(structuredData);

    setShowPress(structuredData);
  }

  useEffect(() => {
    getPress();
  }, []);

  useEffect(() => {
    let list = [];
    if (allPress && allPress[showYear]) {
      for (let press of allPress[showYear]) {
        if (!list.includes(press.month)) {
          list.push(press.month);
        }
      }

      list.sort();
    }
    setMonthsList(list);
    setShowMonth("all");
  }, [showYear, allPress]);

  useEffect(() => {
    if (allPress) {
      updatesShowPress(showYear, showMonth);
    }
  }, [showMonth]);

  if (allPress === null) return;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-6xl flex justify-center flex-col ">
        <div className="w-full flex justify-center">
          <div className="w-full border-black border-4 pb-2">
            <div className=" w-full flex flex-wrap px-10 gap-8 text-[#444] font-Poppins justify-center py-3 pt-0">
              <div className="self-start">
                <select
                  value={showYear}
                  onChange={(e) => {
                    setShowYear(e.target.value);
                    setShowMonth("all");
                  }}
                  className="flex w-full justify-center rounded-b-md bg-[#EF4D48] px-8 py-2 text-md font-semibold leading-6 text-white shadow-sm focus:outline-none"
                >
                  {yearsList.map((year, index) => {
                    return (
                      <option
                        value={year}
                        key={index}
                        className="bg-white font-Poppins text-[#444] rounded-lg"
                      >
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="grow flex flex-wrap justify-center items-center gap-6 font-semibold text-lg">
                <button
                  onClick={() => {
                    setShowMonth("all");
                    updatesShowPress(showYear, "all");
                  }}
                  className={` py-[6px] px-4 tracking-wider ${
                    showMonth === "all"
                      ? "bg-black text-white rounded-b-md "
                      : ""
                  } `}
                >
                  ALL
                </button>
                {monthsList.map((month, index) => {
                  return (
                    <button
                      onClick={() => {
                        setShowMonth(month);
                        updatesShowPress(showYear, month);
                      }}
                      className={` px-4 py-[6px]  tracking-wider ${
                        showMonth === month
                          ? "bg-black text-white  rounded-b-md "
                          : ""
                      } `}
                      key={index}
                    >
                      {monthsName[month]}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="w-full flex flex-wrap ">
              {showPress[showYear].map((e, i) => {
                return (
                  <div
                    className="w-full min-[450px]:w-1/2 sm:w-1/3 lg:w-1/4 border-[3px] h-80 overflow-hidden p-3 flex items-center group relative hover:cursor-pointer "
                    key={i}
                    onClick={() => {
                      setShowImage(e);
                    }}
                  >
                    <div className="absolute inset-0 bg-[#323233] opacity-0 group-hover:opacity-80 transition-opacity duration-300 rounded-md"></div>

                    <img src={e.imageURL} className="w-full " />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {showImage && (
        <ImagePreview
          data={showImage}
          showImage={showImage}
          setShowImage={setShowImage}
        />
      )}
    </div>
  );
};

export default Body;
