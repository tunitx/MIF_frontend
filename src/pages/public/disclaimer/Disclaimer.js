import React, { useEffect } from "react";
import Header from "./Header";
import Body from "./Body";
import StudyAbroadSection from "../home/StudyAbroadSection";
import Footer from "./Footer";

const Disclaimer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <Body />
      <StudyAbroadSection />
      <Footer />
    </div>
  );
};

export default Disclaimer;
