import React, { useState } from "react";
import { Link } from "react-router-dom";

const Section = ({
  question,
  answer,
  visibleComponent,
  setVisibleComponent,
  index,
}) => {
  return (
    <div className="w-full ">
      <div className="bg-[#EF4D48] p-4 flex justify-between items-center gap-2 w-full">
        <svg
          fill="#fff"
          height="2rem"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          transform={visibleComponent === index ? "rotate(90)" : ""}
        >
          <g data-name="Layer 2">
            <g data-name="arrow-ios-forward">
              <rect
                width={24}
                height={24}
                transform="rotate(-90 12 12)"
                opacity={0}
              />
              <path d="M10 19a1 1 0 0 1-.64-.23 1 1 0 0 1-.13-1.41L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z" />
            </g>
          </g>
        </svg>

        <p
          onClick={() => {
            visibleComponent === index
              ? setVisibleComponent(null)
              : setVisibleComponent(index);
          }}
          className="text-white font-Poppins font-medium text-[15px] leading-5 text-left w-full hover:cursor-pointer"
        >
          {question}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          width="20px"
          viewBox="0 0 448 512"
          className="font-bold"
          fill="#fff"
        >
          {/* <style dangerouslySetInnerHTML={{ __html: "svg{fill:#ffffff}" }} /> */}
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
        </svg>
      </div>
      {visibleComponent === index ? (
        <div className="shadow-box_shadow_marwadi p-4 font-normal font-Poppins">
          <p className="text-[#333] text-sm">{answer}</p>
        </div>
      ) : null}
    </div>
  );
};

const FAQs = ({ faqs, viewMore }) => {
  const [visibleComponent, setVisibleComponent] = useState(null);

  return (
    <div className="px-5 py-12 w-full sm:flex sm:justify-center">
      <div className="max-w-3xl flex flex-col items-center gap-8 w-full">
        <div className="flex flex-col justify-center items-center gap-4 mb-8">
          <h2 className="text-4xl font-PlayFair text-center font-bold">
            Frequently Asked Questions
          </h2>
          <div className="h-0.5 bg-black w-24 rounded-md"></div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          {faqs.map((faq, index) => {
            return (
              <Section
                {...faq}
                key={index}
                visibleComponent={visibleComponent}
                setVisibleComponent={setVisibleComponent}
                index={index + 1}
              />
            );
          })}
        </div>
        {viewMore === false ? (
          ""
        ) : (
          <Link to={"/faqs"} className="w-full mx-auto flex justify-center">
            <button className="flex w-full justify-center max-w-[120px] rounded-md bg-[#EF4D48] px-2 py-2 text-lg font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 ">
              View More
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default FAQs;
