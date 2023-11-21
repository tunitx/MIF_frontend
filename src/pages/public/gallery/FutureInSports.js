import React from "react";
import events4 from "../../../../assests/images/events4.jpeg";
import events5 from "../../../../assests/images/events5.jpeg";
import future_in_sports2 from "../../../../assests/images/future_in_sports2.jpeg";
import future_in_sports3 from "../../../../assests/images/future_in_sports3.jpeg";
import Carousel from "react-multi-carousel";

const FutureInSports = () => {
  const imagesSlides = [events4, events5, future_in_sports2, future_in_sports3];
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
    <div className="w-full p-5 relative flex justify-center mt-8">
      <div className="max-w-6xl w-full flex flex-col gap-8">
        <h2 className="text-[#EF4D48] font-Lato text-center w-full text-xl font-bold lg:text-2xl">
          Future in @sports
        </h2>
        <p className="text-center text-[#453E3E] font-Poppins w-full">
          Workshop organised Jointly By{" "}
          <strong>Marwadi International Federation</strong> and{" "}
          <strong>Aadishakti Women Foundation</strong>. Legends Speaker was{" "}
          <strong>Jasia Akhatar</strong>, Cricketer (Indian Cricketer),&nbsp;{" "}
          <strong>Shatabdi Avasti</strong> (International Paralympic),{" "}
          <strong>Prachi Gujar</strong>, Athlete (Medallist in South Asia Games
          ) and <strong>Sapna Punia</strong>, Athlete (Medallist in Olympic
          Games ), Program manage by <strong>Gangatori Chauhan</strong> (Chief
          Selector , Rajasthan Cricket Association),{" "}
          <strong>Mumal Mehar</strong>, Barmer also present as a special guest.
        </p>
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
      </div>
    </div>
  );
};

export default FutureInSports;
