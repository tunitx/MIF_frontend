import { useEffect, useContext, useState } from "react";
import TopLoadingBarContext from "../utils/context/TopLoadingBarContext";

export const useTopLoadingBar = (totalComponentsToBeLoaded) => {
  const { topLoadingBarRef } = useContext(TopLoadingBarContext);

  const [componentsLoaded, setComponentLoaded] = useState(0);

  useEffect(() => {
    topLoadingBarRef?.current?.continuousStart();
  }, []);

  const LoadingDone = () => {
    topLoadingBarRef?.current?.complete();
  };

  return { LoadingDone };
};
