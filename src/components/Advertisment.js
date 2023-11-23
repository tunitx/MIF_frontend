import React, { useEffect, useState } from "react";
import { companies, GET_ADVERTISMENTS } from "../utils/constants";
import Carousel from "react-multi-carousel";

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

  const [advertisments, setAdvertisments] = useState([]);

  console.log(advertisments);

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

  if (!advertisments) return;

  return (
    <div className="w-full relative max-w-5xl">
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={2000}
        transitionDuration={2000}
        infinite={true}
        renderDotsOutside={true}
        arrows={false}
        showDots={true}
        dotListClass="flex gap-4 mt-4 relative"
        containerClass="mb-10"
        itemClass="flex justify-center items-center"
      >
        {advertisments.map((advertisment) => {
          return (
            <div
              key={advertisment._id}
              className="w-[95%] bg-white flex gap-8 flex-col h-full  p-2 py-4 rounded-md pb-6 border-b-4 hover:border-[#2575fc] border-[#f7f3f5] box-border hover:cursor-pointer "
            >
              <div className="w-full flex justify-center items-center">
                <img
                  src={advertisment.businessImage}
                  className="rounded-md sm:w-11/12"
                />
              </div>
              <div className="flex gap-4 px-4 flex-wrap justify-center w-full">
                {/* Email */}

                {advertisment?.email && (
                  <a href={`mailto:${advertisment?.email}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.3em"
                      viewBox="0 0 512 512"
                      fill="#EF4D48"
                      className="group-hover:fill-white"
                    >
                      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                    </svg>
                  </a>
                )}

                {/* Facebook */}

                {advertisment?.facebook && (
                  <a href={`${advertisment.facebook}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.3em"
                      viewBox="0 0 512 512"
                      fill="#EF4D48"
                      className="group-hover:fill-white"
                    >
                      {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                      <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                    </svg>
                  </a>
                )}

                {/* Instagram */}

                {advertisment?.instagram && (
                  <a href={`${advertisment.instagram}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.3em"
                      viewBox="0 0 448 512"
                      fill="#EF4D48"
                      className="group-hover:fill-white"
                    >
                      {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                    </svg>
                  </a>
                )}

                {/* Phone */}

                {advertisment?.phone && (
                  <a href={`tel:${advertisment.phone}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.3em"
                      viewBox="0 0 512 512"
                      fill="#EF4D48"
                      className="group-hover:fill-white"
                    >
                      {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                      <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                    </svg>
                  </a>
                )}

                {/* PlayStore */}

                {advertisment?.playStore && (
                  <a href={`${advertisment.playStore}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.3em"
                      viewBox="0 0 512 512"
                      fill="#EF4D48"
                      className="group-hover:fill-white"
                    >
                      {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                    </svg>
                  </a>
                )}

                {/* Twitter */}

                {advertisment?.twitter && (
                  <a href={`${advertisment.twitter}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.3em"
                      viewBox="0 0 512 512"
                      fill="#EF4D48"
                      className="group-hover:fill-white"
                    >
                      {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                    </svg>
                  </a>
                )}

                {/* Website */}

                {advertisment?.website && (
                  <a href={`${advertisment.website}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.3em"
                      viewBox="0 0 512 512"
                      fill="#EF4D48"
                      className="group-hover:fill-white"
                    >
                      {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                      <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" />
                    </svg>
                  </a>
                )}

                {/* WhatsApp */}

                {advertisment?.whatsapp && (
                  <a href={`https://wa.me/${advertisment.whatsapp}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.3em"
                      viewBox="0 0 448 512"
                      fill="#EF4D48"
                      className="group-hover:fill-white"
                    >
                      {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                    </svg>
                  </a>
                )}

                {/* Youtube */}

                {advertisment?.youtube && (
                  <a href={`${advertisment.youtube}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.3em"
                      viewBox="0 0 576 512"
                      fill="#EF4D48"
                      className="group-hover:fill-white"
                    >
                      {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                    </svg>
                  </a>
                )}
              </div>
              <div className="w-full flex justify-center">
                <div className="h-[3px] w-2/6 bg-[#2575fc] rounded-full"></div>
              </div>
              <div className="flex w-full gap-6 flex-col items-center">
                <h3 className="font-bold text-lg font-Poppins text-center sm:w-11/12">
                  {advertisment.title}
                </h3>
                <p className="text-[#00000080] text-center sm:w-11/12">
                  {advertisment.description}
                </p>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Advertisment;
