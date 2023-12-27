import React, { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Advertisment from "./components/Advertisment";
import PressClipContext from "./utils/context/PressClipContext";
import PressCutoutContext from "./utils/context/PressCutoutContext";
import { useState } from "react";
import { GET_PRESS_CLIPS, GET_PRESS_CUTOUTS } from "./utils/constants";
import LoadingBar from "react-top-loading-bar";
import TopLoadingBarContext from "./utils/context/TopLoadingBarContext";

const Public = () => {
  const [clips, setClips] = useState(null);
  const [cutouts, setCutouts] = useState(null);

  const topLoadingBarRef = useRef();

  useEffect(() => {
    async function getClips() {
      try {
        const resBody = await fetch(GET_PRESS_CLIPS, {
          method: "GET",
          headers: {},
        });

        if (resBody.status === 200) {
          const resData = await resBody.json();
          setClips(resData);
        } else {
          throw new Error("Something went wrong, couldn't access data");
        }
      } catch (e) {
        console.log(e.message);
      }
    }

    getClips();

    async function getCutouts() {
      try {
        const resBody = await fetch(GET_PRESS_CUTOUTS, {
          method: "GET",
          headers: {},
        });

        if (resBody.status === 200) {
          const resData = await resBody.json();
          setCutouts(resData);
        } else {
          throw new Error("Something went wrong, couldn't access data");
        }
      } catch (e) {
        console.log(e.message);
      }
    }

    getCutouts();
  }, []);

  return (
    <PressCutoutContext.Provider value={{ cutouts, setCutouts }}>
      <PressClipContext.Provider value={{ clips, setClips }}>
        <TopLoadingBarContext.Provider value={{ topLoadingBarRef }}>
          <LoadingBar color="#EF4D48" ref={topLoadingBarRef} />
          <div className="bg-[#f7f3f5]">
            <Navbar />
            <Outlet />
            <div className="w-full flex justify-center ">
              <Advertisment />
            </div>
            <Footer />
          </div>
        </TopLoadingBarContext.Provider>
      </PressClipContext.Provider>
    </PressCutoutContext.Provider>
  );
};

export default Public;
