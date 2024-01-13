import React, { useEffect, useState } from "react";
import { GET_ADVERTISMENTS_SPEED } from "../../utils/constants";
import AdCarousel from "./AdCarousel";
import axios from "axios";

const Advertisment = () => {
  const [advertismentSpeed, setAdvertismentSpeed] = useState(1000);

  useEffect(() => {
    async function get_adsSpeed() {
      try {
        const res = await axios.get(GET_ADVERTISMENTS_SPEED);
        // console.log(res);
        if (res.status === 200) {
          setAdvertismentSpeed(res.data.value);
        } else {
          setAdvertismentSpeed(1000);
        }
      } catch (e) {
        console.log(e);
      }
    }

    get_adsSpeed();
  }, []);

  return (
    <div className="w-full bg-[#f7f3f5] relative  gap-5 flex justify-center flex-col items-center px-3 sm:px-5 ">
      {/* <div className="w-full p-5 relative flex justify-center">
        <div className="max-w-6xl w-full flex flex-col gap-8">
          <h2 className="text-[#2B161B] text-xl font-Poppins font-bold my-8 w-full text-center md:text-3xl lg:text-4xl">
            Our Sponsors{" "}
          </h2>
        </div>
      </div> */}
      <div className="w-full max-w-6xl grid grid-cols-1  md:grid-cols-3 content-center gap-7	justify-items-center ">
        <AdCarousel
          itemsPerFrame={1}
          category="platinum"
          advertismentSpeed={advertismentSpeed}
        />
        <AdCarousel
          itemsPerFrame={2}
          category="gold"
          advertismentSpeed={advertismentSpeed}
        />
        <AdCarousel
          itemsPerFrame={3}
          category="silver"
          advertismentSpeed={advertismentSpeed}
        />
      </div>
    </div>
  );
};

export default Advertisment;
