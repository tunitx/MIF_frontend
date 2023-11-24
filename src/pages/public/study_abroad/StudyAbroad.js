import React, { useEffect } from "react";
import Header from "./Header";
import StudyAbroadSection from "../home/StudyAbroadSection";
import Body from "./Body";

const StudyAbroad = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header />
      <Body />
      <StudyAbroadSection />
    </div>
  );
};

export default StudyAbroad;
