import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-16 mt-10">
      <div className="max-w-6xl flex flex-col justify-center items-center text-left gap-4 w-fit">
        <div className="text-gray-900 font-bold text-4xl leading-[2.5rem] tracking-normal font-Poppins w-full">
          Hi there,
        </div>
        <p className="text-[#EF4D48] font-semibold text-4xl tracking-normal font-Poppins w-full">
          Admin
        </p>
        <div className="text-gray-900 font-bold text-2xl leading-[1rem] tracking-normal font-Poppins w-full">
          How are you doing today.
        </div>
      </div>
    </div>
  );
};

export default Home;
