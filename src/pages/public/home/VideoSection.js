import React from "react";

// import firstVideo from "../../../../assests/videos/WhatsApp-Video-2023-02-21-at-7.27.16-PM.mp4";
// import secondVideo from "../../../../assests/videos/NewsVideo.mp4";

const VideoSection = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full flex flex-col sm:flex-row gap-8 items-center justify-center p-5 max-w-6xl ">
        <div className="md:w-1/2 w-full rounded-2xl h-fit sm:h-[300px] sm:overflow-y-hidden flex justify-center items-end aspect-video relative">
          {/* <video
            loop
            controls={true}
            autoPlay
            preload="metadata"
            muted={true}
            controlsList="nodownload"
            className="w-full object-cover rounded-xl"
          >
            <source src="https://marwadiinternationalfederation.com/wp-content/uploads/2023/02/WhatsApp-Video-2023-02-21-at-7.27.16-PM.mp4"></source>
          </video> */}
          <iframe
            src="https://www.youtube.com/embed/HeXTYcwZWr0?si=mIwbFBHgdeb1wa-c&rel=0&mute=1&autoplay=1&loop=1&playlist=HeXTYcwZWr0"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            className="w-full object-cover rounded-xl h-full"
          ></iframe>
        </div>
        <div className="md:w-1/2 w-full rounded-2xl h-fit sm:h-[300px] sm:overflow-y-hidden flex justify-center items-center">
          {/* <video
            autoPlay
            loop
            muted={true}
            controls={true}
            preload="metadata"
            controlsList="nodownload"
            className="w-full object-cover rounded-xl"
          >
            <source src="https://marwadiinternationalfederation.com/wp-content/uploads/2022/12/NewsVideo.mp4"></source>
          </video> */}
          <iframe
            // width="560"
            // height="315"
            src="https://www.youtube.com/embed/-C65g6Jujac?si=Tg2OpfgE_IVFwwvI&playlist=-C65g6Jujac&autoplay=1&mute=1&loop=1&rel=0"
            // title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            className="w-full object-cover rounded-xl h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
