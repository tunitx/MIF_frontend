import React from "react";
import Swal from "sweetalert2";
import { useEffect } from "react";

const ImagePreview = ({ data, showImage, setShowImage }) => {
  // const { imageURL } = data;

  return (
    <div className="fixed fade-in flex flex-col justify-center items-center gap-8  w-screen h-screen top-0 left-0 bg-[#323233] overflow-y-auto overflow-x-auto p-5 bg-opacity-90 z-50">
      <div className="w-full h-full flex sm:flex-row-reverse flex-col gap-4 justify-center items-center">
        <div
          className="self-start flex justify-center  hover:cursor-pointer group mt-2"
          onClick={() => {
            setShowImage(null);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2em"
            viewBox="0 0 384 512"
            fill="#fff"
            className="group-hover:fill-[#EF4D48]"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </div>

        <div className="w-fit sm:h-full h-fit rounded-lg">
          <img
            src={data?.imageURL}
            alt="image"
            className="rounded-lg max-h-[85vh] my-auto "
          />
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
