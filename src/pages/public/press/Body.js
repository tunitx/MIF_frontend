import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Carousel from "react-multi-carousel";
import { GET_ALL_PRESS, GET_YEARS_LIST } from "../../../utils/constants";
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

  const [currentSlide, setCurrentSlide] = useState(0);

  const [showPressCarousel, setShowPressCarousel] = useState(false);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 740 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 740, min: 0 },
      items: 1,
    },
  };

  function updatesShowPress(forYear, forMonth) {
    if (allPress[forYear]) {
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
  }

  /**
   *
   * @param {*} allPressData
   * @param {*} yearsListData
   * @returns data of the press in the format :
   *
   *     {
   *        year1: [press1_object, press2_object],
   *         year2 : [press1_object, press2_object]
   *    }
   */

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
    try {
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
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getPress();
  }, []);

  // This is for getting the list of the months, for which press is available for a particukar year

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

  if (!allPress || Object.keys(allPress)?.length <= 0) return;

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
              {showPress[showYear]?.map((e, i) => {
                return (
                  <div
                    className="w-full min-[450px]:w-1/2 sm:w-1/3 lg:w-1/4 border-[3px] h-80 overflow-hidden p-3 flex items-center group relative hover:cursor-pointer "
                    key={i}
                    onClick={() => {
                      setCurrentSlide(i);
                      setShowPressCarousel(true);
                    }}
                  >
                    <div className="absolute inset-0 bg-[#323233] opacity-0 group-hover:opacity-80 transition-opacity duration-300 rounded-md"></div>

                    <img
                      src={e.imageURL}
                      className="h-full w-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {showPressCarousel && (
        <div className="fixed fade-in flex flex-col justify-center items-center gap-8 backdrop-blur  w-screen h-screen top-0 left-0 bg-[#323233] overflow-y-auto overflow-x-auto p-5 bg-opacity-90 z-50">
          <div className="w-full h-full flex sm:flex-row-reverse flex-col gap-4 justify-center items-center">
            <div
              className="self-start flex justify-center  hover:cursor-pointer group mt-2"
              onClick={() => {
                setShowPressCarousel(false);
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

            <div className="relative pb-4 sm:w-[80vw] w-full">
              <Carousel
                // ref={carouselRef}
                ref={(el) => {
                  el?.goToSlide(currentSlide, true);
                }}
                responsive={responsive}
                // autoPlay={true}
                // autoPlaySpeed={2000}
                transitionDuration={1000}
                // infinite={true}
                renderDotsOutside={true}
                showDots={true}
                dotListClass="flex gap-2 mt-4 relative flex-wrap"
                containerClass="mb-10"
                itemClass="flex justify-center items-center"
              >
                {showPress[showYear]?.map((imageSlide, index) => {
                  return (
                    <div key={index} className="w-fit  h-fit rounded-lg ">
                      <img
                        src={imageSlide.imageURL}
                        alt={`image${index}`}
                        className="rounded-lg max-h-[80vh] my-auto "
                      />
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
