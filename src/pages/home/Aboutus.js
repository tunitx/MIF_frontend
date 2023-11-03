import React from "react";
import aboutus_economy from "../../../assests/images/aboutus_economy.png";
import aboutus_entrepreneur from "../../../assests/images/aboutus_entrepreneur.png";
import aboutus_network from "../../../assests/images/aboutus_network.png";
import aboutus_networking from "../../../assests/images/aboutus_networking.png";
import aboutus_team from "../../../assests/images/aboutus_team.png";
import aboutus_entrepreneur from "../../../assests/images/aboutus_entrepreneur.png";
import aboutus_skill_development from "../../../assests/images/aboutus_skill-development.png";
import aboutus_social_care from "../../../assests/images/aboutus_social-care.png";
import aboutus_women_entrepreneur from "../../../assests/images/aboutus_women_entrepreneur.png";
// import Carousel from "../../components/CarouselImage";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Aboutus = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
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
  const slides = [
    {
      imageSource: aboutus_network,
      title: "Bridging",
      description: "Between Businesses to Businesses and Government",
    },
    {
      imageSource: aboutus_economy,
      title: "Economic Development",
      description: "Of the state and the country",
    },
    {
      imageSource: aboutus_team,
      title: "Employment",
      description: "Opportunities to Youngsters and Women",
    },
    {
      imageSource: aboutus_networking,
      title: "Networking",
      description: "Provides Business and Social Networking Opportunities",
    },
    {
      imageSource: aboutus_entrepreneur,
      title: "Incubation",
      description: "Support to Businesses and Startup",
    },
    {
      imageSource: aboutus_skill_development,
      title: "Skill Development",
      description: "Enhancing Your Skill Development Journey",
    },
    {
      imageSource: aboutus_social_care,
      title: "Social Obligation",
      description: "Social Responsibility in Ethical Framework",
    },
    {
      imageSource: aboutus_women_entrepreneur,
      title: "Women Entrepreneurship",
      description: "Breaking Barriers and Building Success",
    },
  ];

  return (
    <div className="flex px-5 py-12 justify-center w-full">
      <div className="w-full  px-5 py-12 flex flex-col justify-center gap-6 max-w-6xl shadow-box_shadow_marwadi rounded-lg border-b-[5px] border-[#EF4D48]">
        <h2 className="text-center text-2xl sm:text-3xl lg:text-5xl font-bold font-PlayFair">
          About Us
        </h2>
        <h3 className="text-center text-xl sm:text-2xl lg:text-3xl font-bold font-PlayFair mb-7">
          Marwadi International Federation
        </h3>
        <div className="flex flex-col gap-6">
          <p className="text-[#484444] font-Poppins text-sm sm:text-md lg:text-lg  font-medium">
            Marwadi International Federation is a non-profit organization
            registered by the Government of India. “Marwadi International
            Federation” ( MIF ) is an organization formed with the objective of
            developing cultural, social , economic and industrial development
            harmony among the Rajasthani’s including those living in and outside
            Rajasthan .
          </p>
          <p className="text-[#484444] font-Poppins text-sm sm:text-md lg:text-lg font-medium">
            The main objective of this organization is to promote social,
            cultural, trade and business among the people of Rajasthan.&nbsp;The
            foundation of Rajasthan’s glorious history and bright future has
            been laid by its artisans, confectioners and businessmen.
          </p>
        </div>
        <div className="my-8 relative">
          <Carousel
            responsive={responsive}
            autoPlay={true}
            autoPlaySpeed={2000}
            transitionDuration={1000}
            removeArrowOnDeviceType={[
              "tablet",
              "mobile",
              "desktop",
              "superLargeDesktop",
            ]}
            infinite={true}
            renderDotsOutside={true}
            showDots={true}
            dotListClass="flex gap-2 mt-4 relative"
            containerClass="mb-10"
          >
            {slides.map(({ imageSource, title, description }, index) => {
              return (
                <div className="flex gap-2 items-center" key={index}>
                  <img src={imageSource} alt={title} className="w-1/3" />
                  <div className="flex flex-col gap-2">
                    <p className="font-Poppins font-bold text-[17px]">
                      {title}
                    </p>
                    <p className="font-Poppins font-normal text-sm">
                      {description}
                    </p>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
        <div className="image_carousel_for_about_us w-full flex justify-center mt-4">
          <button className="flex w-full justify-center max-w-[150px] rounded-md bg-[#EF4D48] px-5 py-3 text-lg font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
