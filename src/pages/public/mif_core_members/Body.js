import React from "react";
import Carousel from "react-multi-carousel";

// import teamMif1 from "../../../assests/images/teamMif1.jpeg.webp";
// import teamMif2 from "../../../assests/images/teamMif2.jpeg.webp";
// import teamMif3 from "../../../assests/images/teamMif3.jpeg.webp";
// import teamMif4 from "../../../assests/images/teamMif4.jpeg.webp";

const Body = () => {
  const imagesSlides = [
    "./assests/images/teamMif1.jpeg.webp",
    "./assests/images/teamMif2.jpeg.webp",
    "./assests/images/teamMif3.jpeg.webp",
    "./assests/images/teamMif4.jpeg.webp",
    // teamMif1,
    // teamMif2,
    // teamMif3,
    // teamMif4,
  ];

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

  return (
    <div className="w-full flex justify-center items-center mb-8">
      <div className="mt-12 w-full flex  justify-center items-center max-w-6xl">
        <div className="relative pb-4 w-full">
          <Carousel
            responsive={responsive}
            // autoPlay={true}
            // autoPlaySpeed={2000}
            transitionDuration={1000}
            infinite={true}
            renderDotsOutside={true}
            showDots={true}
            dotListClass="flex gap-2 mt-4 relative"
            containerClass="mb-10"
            itemClass="flex justify-center items-center"
          >
            <div className="flex justify-center items-center w-full">
              <div
                className={`bg-[url("./assests/images/teamMif1.jpeg.webp")] w-3/4 h-[512px] md:h-screen bg-contain bg-no-repeat bg-center`}
              ></div>
            </div>
            <div className="flex justify-center items-center w-full">
              <div
                className={`bg-[url("./assests/images/teamMif2.jpeg.webp")] w-3/4 h-[512px] md:h-screen bg-contain bg-no-repeat bg-center`}
              ></div>
            </div>
            <div className="flex justify-center items-center w-full">
              <div
                className={`bg-[url("./assests/images/teamMif3.jpeg.webp")] w-3/4 h-[512px] md:h-screen bg-contain bg-no-repeat bg-center`}
              ></div>
            </div>
            <div className="flex justify-center items-center w-full">
              <div
                className={`bg-[url("./assests/images/teamMif4.jpeg.webp")] w-3/4 h-[512px] md:h-screen bg-contain bg-no-repeat bg-center`}
              ></div>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Body;
