import { useState } from "react";
export default function CarouselImage({ slides }) {
  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="overflow-hidden relative w-80 lg:w-md h-80 lg:h-96 flex justify-center items-center">
      <div
        className={`flex transition ease-out duration-40`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      ></div>

      <div className="absolute top-0 h-full w-full justify-between items-center   text-3xl">
        <button onClick={previousSlide} className="absolute top-1/2 left-2">
          {/* <BsFillArrowLeftCircleFill />+ */}
          <svg
            fill="#000000"
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
        <button onClick={nextSlide} className="absolute top-1/2 right-2">
          <svg
            fill="#000000"
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
      </div>

      <div className="bottom-0 py-4 flex justify-center gap-3 w-full">
        <div className="rounded-full cursor-pointer w-full flex justify-center items-center">
          <img src={slides[current]} className="lg:h-[300px] w-auto" />
        </div>
      </div>
    </div>
  );
}
