import React, { useEffect, useState } from "react";
import marwadi_logo from "../../assests/images/marwari_logo_pro.webp";
import { Link } from "react-router-dom";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import { useAdvertisment } from "../hooks/useAdvertisment";

const Footer = () => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  const [visitorCount, setVisitorCount] = useState(6384);

  const { categorisedAds } = useAdvertisment("bronze");
  // console.log(categorisedAds);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let api;
  //     google.auth
  //       .getClient({
  //         scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
  //       })
  //       .then((auth) => {
  //         api = google.analyticsreporting({ version: "v4", auth });
  //         const batchGet = promisify(api.reports.batchGet.bind(api.reports));
  //         return batchGet({
  //           requestBody: {
  //             reportRequests: [
  //               {
  //                 viewId: process.env.VIEW_ID,
  //                 dateRanges: [
  //                   {
  //                     startDate: "7daysAgo",
  //                     endDate: "today",
  //                   },
  //                 ],
  //                 metrics: [
  //                   {
  //                     expression: "ga:users",
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         });
  //       })
  //       .then(({ data: { reports } }) => {
  //         const visitorsCount = reports[0].data.totals[0].values[0];
  //         console.log(`Visitors count: ${visitorsCount}`);
  //         setVisitorCount(visitorsCount);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   };

  //   fetchData();
  // }, []);
  return (
    <div className="w-full flex flex-col bg-[#5C5D5C] text-[#F6F7F8] sm:items-center">
      {/* Footer Section */}

      <div className="w-full flex flex-col items-center md:flex-row px-5 py-16 gap-12 md:gap-8   max-w-7xl">
        {/* Non-Advertisment Section of Footer */}

        <div className="w-full flex flex-col items-center sm:flex-row   gap-10 max-w-7xl">
          {/* Company Logo Section */}

          <div className="w-full flex justify-center flex-col  gap-4 sm:justify-start items-center">
            <img
              src={marwadi_logo}
              alt="marwadi-logo"
              className="max-w-[282px] h-auto"
            />

            <p className="text-white font-PlayFair text-xl font-bold text-center">
              Follow Us
            </p>
            <div className="w-full flex gap-6 justify-center">
              {/* svgs of the socials */}

              <a
                href={`https://www.facebook.com/profile.php?id=100093420788333&mibextid=ZbWKwL`}
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.3em"
                  viewBox="0 0 512 512"
                  fill="#f0d2d2"
                  className="group-hover:fill-white"
                >
                  {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                  <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                </svg>
              </a>

              <a href={`https://twitter.com/marwadiif`} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.3em"
                  viewBox="0 0 512 512"
                  fill="#f0d2d2"
                  className="group-hover:fill-white"
                >
                  {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </a>

              <a
                href={`https://www.youtube.com/@marwadiinternationalfedration`}
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.3em"
                  viewBox="0 0 576 512"
                  fill="#f0d2d2"
                  className="group-hover:fill-white"
                >
                  {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                  <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                </svg>
              </a>

              <a target="_blank" href="https://g.page/r/Cdh0sCA87LolEAI/review">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.3em"
                  viewBox="0 0 488 512"
                  fill="#f0d2d2"
                >
                  {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/marwadiinternationalfederation/"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.3em"
                  viewBox="0 0 448 512"
                  fill="#f0d2d2"
                  className="group-hover:fill-white"
                >
                  {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Us Section */}

          <div className="font-Poppins  flex flex-col gap-8 sm:justify-start">
            <div className="flex flex-col justify-start gap-4 text-center">
              <p className="font-semibold font-Poppins text-xl">
                <strong>Contact Us</strong>
              </p>
              <div className="flex flex-col gap-3">
                <p className="flex gap-3 items-start justify-start">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.2rem"
                      viewBox="0 0 512 512"
                      fill="#fff"
                    >
                      {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                    </svg>
                  </span>
                  <span>
                    {" "}
                    <strong>Email: </strong> marwadiif@gmail.com
                  </span>
                </p>
                <p className="flex gap-3 items-start justify-start">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.2rem"
                      viewBox="0 0 512 512"
                      fill="#fff"
                    >
                      {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                      <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                    </svg>
                  </span>
                  <span>
                    <strong>Phone: </strong> +91 9314503871
                  </span>{" "}
                </p>
                <p className="flex gap-3 items-start text-left justify-start">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.2rem"
                      viewBox="0 0 384 512"
                      fill="#fff"
                    >
                      {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.*/}
                      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>
                  </span>
                  <span>
                    {" "}
                    <strong>Address: </strong> ABHYAM, C-121 A, Lal Kothi Opp
                    Jyoti Nagar Thana, near Rajasthan Vidhan Sabha, Jaipur,
                    Rajasthan 302015
                  </span>
                </p>
              </div>
            </div>
            {/* <div>
            <p className="text-center"> Total Users : {visitorCount}</p>
          </div> */}
          </div>
        </div>

        {/*Advertisment Section of Footer */}
        {categorisedAds?.length > 0 && (
          <div className="w-full p-5 max-w-md  sm:px-5 sm:py-2 flex justify-center items-center h-full">
            <AutoplaySlider
              play={true}
              interval={2000}
              organicArrows={false}
              animation="cubeAnimation"
              bullets={false}
              className="rounded-md"
            >
              {/* <div>1</div>
          <div>2</div>
          <div>3</div> */}
              {categorisedAds?.map((ad) => {
                return (
                  <div key={ad._id} className="rounded-md">
                    <img src={ad.businessImage} className="rounded-md" />
                  </div>
                );
              })}
            </AutoplaySlider>
          </div>
        )}
      </div>

      {/* Copyright Section */}

      <div className="w-full bg-[#020c1d] flex justify-center">
        <div className=" flex flex-col gap-2 px-[5px] py-5 text-center md:flex-row md:justify-between md:px-10 w-full max-w-6xl">
          <div>
            <p className="text-[#225a9d] text-[15px]">
              Copyright © 2023 Marwadi International Federation
            </p>
          </div>
          <div>
            <span className="text-[#263b78] text-[14px]">
              Designed and Developed by{" "}
              <a
                className="text-[#ff0000]"
                href="https://khojorightnow.com/"
                target="_blank"
              >
                Khojo Right Now
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
