import React, { useEffect } from "react";
import Header from "./Header";
import Body from "./Body";

const Press = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="p-3 w-full">
      <Header />
      <Body />
    </div>
  );
};

export default Press;
