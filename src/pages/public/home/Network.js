import React from "react";
import rajasthan_img from "../../../../assests/images/rajasthan.png";
import india_img from "../../../../assests/images/network_india.png";
import network_overall_img from "../../../../assests/images/network_overall.svg";
import network_overseas_img from "../../../../assests/images/network-overseas.svg";

const Network = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-[#5D5D5D] py-12 flex flex-col gap-4 justify-center items-center text-white">
        <p className="text-xl font-PlayFair font-bold">Our Network</p>
        <p className="font-PlayFair text-xl font-bold">In</p>
      </div>
      <div className="flex flex-col w-full items-center py-10 gap-10 sm:flex-row max-w-6xl sm:self-center">
        <div className="flex flex-col items-center gap-10 sm:grow">
          <div className="rajasthan flex flex-col items-center gap-6">
            {/* svg of rajasthan */}
            <img
              src={rajasthan_img}
              className="max-w-[150px] h-auto sm:max-w-[200px]"
            />
            <div>
              <p className="text-[#2B161B] text-xl font-bold font-PlayFair  text-center">
                Rajasthan
              </p>
              <p className="text-xl font-normal">53 Districts</p>
            </div>
          </div>
          <div className="india  flex flex-col items-center gap-6 ">
            {/* svg of India */}
            <img
              src={india_img}
              className="max-w-[150px] h-auto sm:max-w-[200px] "
            />
            <div>
              <p className="text-[#2B161B] text-xl font-bold font-PlayFair text-center">
                India
              </p>
              <p className="text-xl font-normal">29 States 08 UT's</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center  gap-10 sm:grow">
          <div className="overseas  flex flex-col items-center gap-6">
            {/* svg of overseas */}
            <img
              src={network_overseas_img}
              className="max-w-[150px] h-auto sm:max-w-[200px] "
            />
            <div>
              <p className="text-[#2B161B] text-xl font-bold font-PlayFair  text-center">
                Overseas
              </p>
              <p className="text-xl font-normal">25+ Countries</p>
            </div>
          </div>
          <div className="overall  flex flex-col items-center gap-6">
            {/* svg of overall */}
            <img
              src={network_overall_img}
              className="max-w-[150px] h-auto sm:max-w-[200px]"
            />
            <div>
              <p className="text-[#2B161B] text-xl font-bold font-PlayFair  text-center">
                Overall
              </p>
              <p className="text-xl font-normal">2000+ Team Members</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;
