import React, { useEffect } from "react";
import Body from "./Body";

const MembershipAndFees = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Body />
    </div>
  );
};

export default MembershipAndFees;
