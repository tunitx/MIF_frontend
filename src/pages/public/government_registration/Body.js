import React, { useEffect, useState } from "react";
import { REGISTRATIONS as registrations } from "../../../utils/constants";

import Advertisment from "../../../components/advertisment/Advertisment";

const Body = () => {
  const [form, setForm] = useState("12A");

  const [show, setShow] = useState(null);

  useEffect(() => {
    setShow(() => {
      return registrations.filter((item) => {
        return item.subTitle === form;
      })[0];
    });
  }, [form]);

  console.log(show);

  if (!show) return;

  return (
    <div className="w-full flex justify-center items-center p-2 flex-col">
      <div className="mt-12 w-full flex flex-col justify-center items-center  max-w-6xl mb-8 border-[#d5d8dc] border-4 ">
        <div className="border-[#d5d8dc] border-b-4 w-full p-5 flex justify-start items-center">
          <select
            value={form}
            onChange={(e) => {
              setForm(e.target.value);
            }}
            className="flex lg:w-1/3 sm:w-1/2 w-full overflow-x-scroll justify-center rounded-md bg-[#EF4D48] px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus:outline-none"
          >
            {registrations.map((item, index) => {
              //   console.log(item);
              return (
                <option
                  value={item.subTitle}
                  key={index}
                  className="bg-white sm:w-1/2  font-Poppins text-[#444] rounded-lg  w-full overflow-x-scroll text-xs"
                >
                  {item.title} ({item.subTitle})
                </option>
              );
            })}
          </select>
        </div>
        <div className="w-full flex flex-col gap-7 sm:gap-10  p-3 sm:p-5 mt-3 sm:mt-5">
          <div className="w-full flex flex-col gap-2">
            <p className="text-[#EF4D48] font-semibold text-lg font-Poppins w-full text-center md:text-xl ">
              {show.title}
            </p>
            <p className="w-full text-[#444] text-center text-base  font-Poppins sm:text-md">
              ( UNDER {show.ministry} )
            </p>
          </div>
          <div className="w-full flex flex-col gap-8">
            <iframe
              src={`${show.docLink}`}
              allow="autoplay"
              className="w-full h-auto min-h-[512px]"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center max-w-5xl my-8">
        <Advertisment />
      </div>
    </div>
  );
};

export default Body;
