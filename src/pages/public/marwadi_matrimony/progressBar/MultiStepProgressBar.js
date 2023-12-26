import React from "react";
import "./MultiStepProgressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import mifMatrimonyFormTimeLine from "../../../../../assests/images/mifMatrimonyFormTimeLine.png";

// import styled from "@emotion/styled/types/base";

const MultiStepProgressBar = ({ page }) => {
  var stepPercentage = 0;
  if (page === 1) {
    stepPercentage = 0;
  } else if (page == 2) {
    stepPercentage = 14.28;
  } else if (page == 3) {
    stepPercentage = 28.57;
  } else if (page === 4) {
    stepPercentage = 42.85;
  } else if (page === 5) {
    stepPercentage = 57.13;
  } else if (page === 6) {
    stepPercentage = 71.41;
  } else if (page === 7) {
    stepPercentage = 85.7;
  } else if (page === 8) {
    stepPercentage = 99;
  }

  return (
    <ProgressBar percent={stepPercentage}>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            // onClick={() => onPageNumberClick(1)}
          >
            {/* {index + 1} */}
            <img
              src={mifMatrimonyFormTimeLine}
              className={`object-cover w-full ${""}`}
            />
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            {/* {index + 1} */}
            <img
              src={mifMatrimonyFormTimeLine}
              className={`object-cover w-full ${""}`}
            />
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            {/* {index + 1} */}
            <img
              src={mifMatrimonyFormTimeLine}
              className={`object-cover w-full ${""}`}
            />
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            {
              /* {index + 1} */
              <img
                src={mifMatrimonyFormTimeLine}
                className={`object-cover w-full ${""}`}
              />
            }
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            {/* {index + 1} */}
            <img
              src={mifMatrimonyFormTimeLine}
              className={`object-cover w-full ${""}`}
            />
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            {/* {index + 1} */}
            <img
              src={mifMatrimonyFormTimeLine}
              className={`object-cover w-full ${""}`}
            />
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            {/* {index + 1} */}

            <img
              src={mifMatrimonyFormTimeLine}
              className={`object-cover w-full ${""}`}
            />
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            {/* {index + 1} */}

            <img
              src={mifMatrimonyFormTimeLine}
              className={`object-cover w-full ${""}`}
            />
          </div>
        )}
      </Step>
    </ProgressBar>
  );
};

export default MultiStepProgressBar;
