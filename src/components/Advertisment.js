import React, { useEffect, useState } from "react";
import { companies, GET_ADVERTISMENTS } from "../utils/constants";
import Carousel from "react-multi-carousel";
import { useLocation } from "react-router-dom";
import GoldAdvertisment from "./GoldAdvertisment";

const Advertisment = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 740 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 740, min: 0 },
      items: 1,
    },
  };

  // const advertismentSlugs = ['/matrimony', '/press', '/list-of-members', 'all'];

  const location = useLocation();

  const [advertisments, setAdvertisments] = useState([]);
  const slugs = [];

  const [showAdver, setShowAdver] = useState([]);
  console.log(showAdver);

  useEffect(() => {
    async function getAdvertisments() {
      // try {
      const resBody = await fetch(GET_ADVERTISMENTS);
      const resData = await resBody.json();

      return resData;
      // } catch (e) {
      //   console.log(e);
      // }
    }

    getAdvertisments()
      .then((data) => {
        setAdvertisments(data);
      })
      .catch((e) => {
        setAdvertisments([]);
      });
  }, []);

  useEffect(() => {
    setShowAdver(advertisments);
  }, [advertisments]);

  useEffect(() => {
    const adver = advertisments?.filter((ad) => {
      if (ad?.slugs?.includes("all")) return true;
      return ad?.slugs?.includes(location.pathname);
    });

    setShowAdver(adver);
  }, [location, advertisments]);

  if (!advertisments || advertisments?.length === 0) return;
  if (!showAdver || showAdver?.length === 0) return;

  return (
    <div className="w-full bg-[#f7f3f5] relative max-w-6xl  flex justify-center items-center px-5 my-10">
      {showAdver && showAdver.length > 0 && (
        // <div className="w-full grid grid-cols-1  md:grid-cols-3 content-center gap-7	justify-items-center p-3">
        <div className="w-full flex flex-col sm:flex-row gap-6 p-3">
          <GoldAdvertisment
            showAdver={showAdver}
            itemsPerFrame={1}
            category="platinum"
          />
          <GoldAdvertisment
            showAdver={showAdver}
            itemsPerFrame={2}
            category="gold"
          />
          <GoldAdvertisment
            showAdver={showAdver}
            itemsPerFrame={3}
            category="silver"
          />
        </div>
      )}
    </div>
  );
};

export default Advertisment;
