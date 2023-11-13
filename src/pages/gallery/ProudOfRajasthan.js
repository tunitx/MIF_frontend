import React from "react";
import Carousel from "react-multi-carousel";
import events2 from "../../../assests/images/events2.jpeg.webp";
import events3 from "../../../assests/images/events3.jpeg.webp";
import proud_of_rajasthan3 from "../../../assests/images/proud_of_rajasthan3.jpeg";

const ProudOfRajasthan = () => {
  const imagesSlides = [events2, events3, proud_of_rajasthan3];
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
        <h2 className="text-[#EF4D48] font-Lato text-center w-full text-xl font-bold lg:text-2xl">
          Proud of Rajasthan (Book of Records)
        </h2>
        <p className="text-justify text-[#453E3E] font-Poppins w-full">
          मारवाड़ी इंटरनेशनल फेडरेशन के संस्थापक सचिव सीए विजय गर्ग ने बताया कि,
          राजस्थान स्थापना दिवस पर मारवाड़ी इंटरनेशनल फेडरेशन ने निर्णय लिया है
          कि ऐसी प्रतिभाएं जिन्होंने राजस्थान का नाम रोशन किया है या राजस्थान को
          गौरवान्वित महसूस कराया है उन प्रतिभाओं के लिए “प्राउड ऑफ राजस्थान”
          बुक्स ऑफ रिकॉर्ड का प्रकाशन किया जाएगा | इस रिकॉर्ड बुक में विभिन्न
          क्षेत्रों जैसे राजनीति, खेल, शिक्षा, बिजनेस, व्यापार ,उद्योग, प्रोफेशन
          ,कला एवं साहित्य आदि आदि क्षेत्रों में जिन्होंने राजस्थान का नाम रोशन
          किया है या राजस्थान को गौरवान्वित महसूस कराया है उनका रिकॉर्ड इस बुक
          में रखा जाएगा |&nbsp; “प्राउड ऑफ राजस्थान” बुक्स ऑफ रिकॉर्ड , जिस
          तरीके से देश-विदेश में गिनीज बुक ऑफ रिकॉर्ड, लिम्का बुक ऑफ रिकॉर्ड,
          इंडिया बुक ऑफ रिकॉर्ड है उसी तरीके से राजस्थान की प्रतिभाओं के लिए
          प्राउड ऑफ राजस्थान बुक्स ऑफ रिकॉर्ड का निर्माण किया जाएगा
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

export default ProudOfRajasthan;
