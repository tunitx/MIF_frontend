import React from "react";
import Carousel from "react-multi-carousel";
import events1 from "../../../../assests/images/events1.jpeg.webp";
import events2 from "../../../../assests/images/events2.jpeg.webp";
import events3 from "../../../../assests/images/events3.jpeg.webp";
import events4 from "../../../../assests/images/events4.jpeg";
import events5 from "../../../../assests/images/events5.jpeg";
import Advertisment from "../../../components/Advertisment";

const EventsGallery = () => {
  const imagesSlides = [events1, events2, events3, events4, events5];
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
    <div className="w-full p-5 relative flex justify-center">
      <div className="max-w-6xl w-full flex flex-col gap-8">
        <h2 className="text-[#2B161B] text-xl font-PlayFair font-bold my-8 w-full text-center md:text-2xl lg:text-4xl">
          Gallery & Events
        </h2>
        <div className="relative pb-4">
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
          <Advertisment />
        </div>
      </div>
    </div>
  );
};

export default EventsGallery;
