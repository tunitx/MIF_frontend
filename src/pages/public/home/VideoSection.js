import React from "react";

// import firstVideo from "../../../../assests/videos/WhatsApp-Video-2023-02-21-at-7.27.16-PM.mp4";
// import secondVideo from "../../../../assests/videos/NewsVideo.mp4";

const VideoSection = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full flex flex-col sm:flex-row gap-8 items-center justify-center p-5 max-w-6xl ">
        <div className="md:w-1/2 w-full rounded-2xl h-fit sm:h-[300px] sm:overflow-y-hidden flex justify-center items-end aspect-video relative">
          <video
            loop
            controls={true}
            autoPlay
            preload="metadata"
            muted={true}
            controlsList="nodownload"
            className="w-full object-cover rounded-xl"
          >
            <source src="https://marwadiinternationalfederation.com/wp-content/uploads/2023/02/WhatsApp-Video-2023-02-21-at-7.27.16-PM.mp4"></source>
            {/* <source src={firstVideo}></source> */}
          </video>
        </div>
        <div className="md:w-1/2 w-full rounded-2xl h-fit sm:h-[300px] sm:overflow-y-hidden flex justify-center items-center">
          <video
            autoPlay
            loop
            muted={true}
            controls={true}
            preload="metadata"
            controlsList="nodownload"
            className="w-full object-cover rounded-xl"
          >
            <source src="https://marwadiinternationalfederation.com/wp-content/uploads/2022/12/NewsVideo.mp4"></source>
            {/* <source src={secondVideo}></source> */}
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
