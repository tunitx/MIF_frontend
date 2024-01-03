import React from "react";
import "./MultiStepProgressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import mifMatrimonyFormTimeLine from "../../../../../assests/images/mifMatrimonyFormTimeLine.webp";

// import styled from "@emotion/styled/types/base";

const MultiStepProgressBar2 = ({ page }) => {
  var stepPercentage = 0;
  if (page === 1) {
    stepPercentage = 0;
  } else if (page == 2) {
    stepPercentage = 15.3;
  } else if (page == 3) {
    stepPercentage = 32;
  } else if (page === 4) {
    stepPercentage = 49.5;
  } else if (page === 5) {
    stepPercentage = 66.5;
  } else if (page === 6) {
    stepPercentage = 82;
  } else if (page === 7) {
    stepPercentage = 100;
  }

  return (
    <ProgressBar percent={stepPercentage}>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
            // onClick={() => onPageNumberClick(1)}
          >
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

export default MultiStepProgressBar2;
