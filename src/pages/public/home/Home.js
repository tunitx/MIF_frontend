import React from "react";
import MissionVisionSection from "./MissionVisionSection";
import Header from "./Header";
import Aboutus from "./Aboutus";
import VideoSection from "./VideoSection";
import FounderSection from "./FounderSection";
import MIF_news from "./MIF_news";
import Network from "./Network";
import StudyAbroadSection from "./StudyAbroadSection";
import EventsGallery from "./EventsGallery";
import Services from "./Services";
import FAQs from "./FAQs";
import { faqs_home } from "../../../utils/constants";

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
      <StudyAbroadSection />
      <EventsGallery />
      <Services />
      <FAQs faqs={faqs_home} viewMore={true} />
    </div>
  );
};

export default Home;
