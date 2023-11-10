import React from "react";
import { companies } from "../utils/constants";
import Carousel from "react-multi-carousel";

const Companies = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 740 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 740, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="w-full relative max-w-5xl">
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={2000}
        transitionDuration={2000}
        infinite={true}
        renderDotsOutside={true}
        arrows={false}
        showDots={true}
        dotListClass="flex gap-4 mt-4 relative"
        containerClass="mb-10 p-2"
        itemClass="flex justify-center items-center"
      >
        {companies.map((company) => {
          return (
            <div className="w-full flex gap-8 flex-col h-full  p-2 rounded-md pb-6 border-b-4 hover:border-[#2575fc] border-white box-border hover:cursor-pointer ">
              <div className="w-full flex justify-center items-center">
                <img src={company.img} className="rounded-md sm:w-11/12" />
              </div>
              <div className="w-full flex justify-center">
                <div className="h-[3px] w-2/6 bg-[#2575fc] rounded-full"></div>
              </div>
              <div className="flex w-full gap-6 flex-col items-center">
                <h3 className="font-bold text-lg font-Poppins text-center sm:w-11/12">
                  {company.title}
                </h3>
                <p className="text-[#00000080] text-center sm:w-11/12">
                  {company.description}
                </p>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Companies;
