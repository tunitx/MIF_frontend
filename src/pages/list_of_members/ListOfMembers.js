import React, { useState } from "react";
import Header from "./Header";
import Body from "./Body";
import { Outlet } from "react-router-dom";
import MembersContext from "../../utils/context/Members";
import ProfileCard from "./ProfileCard";

const ListOfMembers = () => {
  const [membersList, setMembersList] = useState([]);

  return (
    <MembersContext.Provider value={{ membersList, setMembersList }}>
      <div className="p-3 w-full">
        <Header />
        <Outlet />
        <Body />
      </div>
    </MembersContext.Provider>
  );
};

export default ListOfMembers;
