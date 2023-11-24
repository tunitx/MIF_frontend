import React, { useEffect } from "react";
import EventsGallery from "../home/EventsGallery";
import Header from "./Header";
import ProudOfRajasthan from "./ProudOfRajasthan";
import FutureInSports from "./FutureInSports";
import InternationalMedia from "./InternationalMedia";

const Gallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {/* <EventsGallery /> */}
      <Header />
      <ProudOfRajasthan />
      <FutureInSports />
      <InternationalMedia />
    </div>
  );
};

export default Gallery;
