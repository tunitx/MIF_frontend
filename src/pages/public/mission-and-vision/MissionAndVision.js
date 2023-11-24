import React, { useEffect } from "react";
import Header from "./Header";
import Body from "./Body";

const MissionAndVision = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full">
      <Header />
      <Body />
    </div>
  );
};

export default MissionAndVision;
