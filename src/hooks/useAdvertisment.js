import React, { useState, useEffect, useContext } from "react";
import AdvertismentContext from "../utils/context/AdvertismentContext";
import { useLocation } from "react-router-dom";

export const useAdvertisment = (category) => {
  const location = useLocation();

  //   getting all the available advertisment

  const { advertismentList, setAdvertismentList } =
    useContext(AdvertismentContext);

  // Filtering advertisment based on slugs

  const [advertismentFilteredBySlugs, setAdvertismentFilteredBySlugs] =
    useState([]);

  useEffect(() => {
    const list = advertismentList?.filter((ad) => {
      if (ad?.slugs?.includes("all")) return true;
      return ad?.slugs?.includes(location.pathname);
    });

    setAdvertismentFilteredBySlugs(list);
  }, [location, advertismentList]);

  //   Filtering advertisment based on category

  let categorisedAds = advertismentFilteredBySlugs?.filter((ad) => {
    return ad.category === category;
  });

  return { categorisedAds };
};
