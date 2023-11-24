import React, { useEffect } from "react";
import Header from "./Header";
import Body from "./Body";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header />
      <Body />
    </div>
  );
};

export default About;
