import React from "react";
import MissionVisionSection from "./MissionVisionSection";
import Header from "./Header";
import Aboutus from "./Aboutus";
import VideoSection from "./VideoSection";
import FounderSection from "./FounderSection";
import MIF_news from "./MIF_news";
import Network from "./Network";
import StudyAbroad from "./StudyAbroad";
import EventsGallery from "./EventsGallery";
import Services from "./Services";
import FAQs from "./FAQs";

const Home = () => {
  return (
    <div>
      <Header />
      <MissionVisionSection />
      <Aboutus />
      <VideoSection />
      <FounderSection />
      <MIF_news />
      <Network />
      <StudyAbroad />
      <EventsGallery />
      <Services />
      <FAQs />
    </div>
  );
};

export default Home;
