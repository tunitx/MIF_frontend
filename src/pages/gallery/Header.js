import React from "react";

const Header = () => {
  return (
    <div className="w-full p-5 relative flex justify-center">
      <div className="max-w-6xl w-full flex flex-col gap-8">
        <h2 className="text-[#2B161B] text-xl font-PlayFair font-bold my-8 w-full text-center md:text-3xl lg:text-5xl">
          Gallery & Events
        </h2>
        {/* <div className="relative pb-4">
        <Carousel
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={2000}
          transitionDuration={1000}
          infinite={true}
          renderDotsOutside={true}
          showDots={true}
          dotListClass="flex gap-2 mt-4 relative"
          containerClass="mb-10"
          itemClass="flex justify-center items-center"
        >
          {imagesSlides.map((imageSlide, index) => {
            return (
              <div
                key={index}
                className="flex justify-center items-center w-full"
              >
                <img
                  src={imageSlide}
                  alt={`image${index}`}
                  className="w-full h-full"
                />
              </div>
            );
          })}
        </Carousel>
      </div>

      <div className="w-full flex justify-center">
        <button className="flex w-full justify-center max-w-[150px] rounded-md bg-[#EF4D48] px-2 py-2 text-md font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 ">
          Explore More
        </button>
      </div>
      <div className="w-full flex justify-center">
        <Companies />
      </div> */}
      </div>
    </div>
  );
};

export default Header;
