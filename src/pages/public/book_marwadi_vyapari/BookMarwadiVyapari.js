import React, { useEffect } from "react";
import Header from "./Header";

const BookMarwadiVyapari = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header />
    </div>
  );
};

export default BookMarwadiVyapari;
