import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function CarouselVideo({ slides }) {
  const location = useLocation();

  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
    console.log("fsgf");
  };

  return (
    <div className="overflow-hidden relative w-full lg:w-2xl flex justify-center items-center">
      {/* <div
        className={`flex transition ease-out duration-40`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      ></div> */}

      {/* <div className="absolute top-0 h-full w-full justify-between items-center   text-3xl"> */}
      <button onClick={previousSlide} className="absolute top-1/2 left-2 z-10">
        <svg
          fill="#fff"
          height="2rem"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          transform={"rotate(180)"}
        >
          <g data-name="Layer 2">
            <g data-name="arrow-ios-forward">
              <rect
                width={24}
                height={24}
                transform="rotate(-90 12 12)"
                opacity={0}
              />
              <path d="M10 19a1 1 0 0 1-.64-.23 1 1 0 0 1-.13-1.41L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z" />
            </g>
          </g>
        </svg>
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-2 z-10">
        <svg
          fill="#fff"
          height="2rem"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g data-name="Layer 2">
            <g data-name="arrow-ios-forward">
              <rect
                width={24}
                height={24}
                transform="rotate(-90 12 12)"
                opacity={0}
              />
              <path d="M10 19a1 1 0 0 1-.64-.23 1 1 0 0 1-.13-1.41L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z" />
            </g>
          </g>
        </svg>
      </button>
      {/* </div> */}

      <div className="bottom-0 flex justify-center gap-3 w-full">
        <div className="rounded-full cursor-pointer w-full flex justify-center items-center">
          {/* <video
            controls={true}
            src={slides[current]}
            className="w-full lg:w-[620px]"
          /> */}
          <iframe
            src={slides[current]?.url}
            width="560"
            // height="315"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            className="h-[250px] lg:h-[280px] xl:h-[315px] w-full sm:w-[320px] lg:w-[400px] xl:w-[520px]"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
