import React from "react";

const Body = () => {
  return (
    <div className="w-full flex justify-center items-center bg-[#5D5D5D] py-8 mt-16 border-b-[1px] border-white">
      <div className="w-full max-w-6xl p-3 px-5 text-white flex flex-col justify-center gap-16">
        <div className="w-[80%] sm:w-full border-l-4 font-PlayFair pl-4 py-12 flex flex-col justify-center gap-4 mx-auto">
          <p className="font-bold text-xl italic text-center sm:text-left sm:text-2xl">
            Mission
          </p>
          <p className="text-sm font-Poppins text-center sm:text-left sm:text-lg">
            “To Establish, Empower and Unite the Worldwide MARWADI Community for
            Social, Cultural and Business Networking with economic growth of
            RAJASTHAN.”
          </p>
        </div>
        <div className="w-[80%] sm:w-full border-l-4 font-PlayFair pl-4 py-12 flex flex-col justify-center gap-4 mx-auto">
          <p className="font-bold text-xl italic text-center sm:text-left sm:text-2xl">
            Vision
          </p>
          <div className="flex flex-col gap-4">
            <p className="text-sm font-Poppins text-center sm:text-left sm:text-lg">
              “Our vision is to be the premier non-profit organization that
              empowers the Marwadi Community across the globe through effective
              business networking, social and cultural enrichment, and
              international business collaboration, through International
              Business Centre, Club’s and Associations..
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-Poppins text-center sm:text-left sm:text-lg">
                Providing a platform that empowers the Marwadi community by
                bridging people and authorities build sustainable partnerships,
                create a positive impact on the economic landscape and enhancing
                their social obligations.
              </p>
              <p className="text-sm font-Poppins text-center sm:text-left sm:text-lg">
                We aspire to play a vital role in driving the economic growth of
                Rajasthan as well as our State and Country of living by
                facilitating investment, fostering entrepreneurship, and
                implementing sustainable development initiatives that uplift the
                region’s economy and improve the livelihoods of its people.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
