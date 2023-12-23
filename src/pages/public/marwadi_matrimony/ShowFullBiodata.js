import React, { useEffect, useState } from "react";
import { GET_BIODATA_BY_ID } from "../../../utils/constants";
import { useParams } from "react-router-dom";
import BiodataFrame from "./biodataFrame/BiodataFrame";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";

const ShowFullBiodata = () => {
  const { id } = useParams();

  const [biodata, setBiodata] = useState("");

  const [isLogged, setIsLogged] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) setIsLogged(false);
  }, []);

  useEffect(() => {
    async function getBiodatabyID() {
      try {
        const resBody = await fetch(`${GET_BIODATA_BY_ID}${id}`);
        // console.log(resBody);

        if (resBody.status === 200) {
          const resData = await resBody.json();
          setBiodata(resData);
          //   console.log(resData);
        } else {
          //   console.log("NOT FOUND");
          setBiodata(null);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getBiodatabyID();
  }, []);

  if (biodata === "") return "";

  return (
    <div>
      {!isLogged ? (
        <Popup
          message={"You need to login first."}
          buttontext={"Login"}
          redirect="/matrimony"
        />
      ) : null}
      {biodata === null ? <p>NOT FOUND</p> : <BiodataFrame info={biodata} />}{" "}
    </div>
  );
};

export default ShowFullBiodata;
