import React from "react";

const Network = () => {
  return (
    <div>
      <div>
        <p>Our Network</p>
        <p>In</p>
      </div>
      <div>
        <div>
          <div className="rajasthan">
            {/* svg of rajasthan */}
            <p>Rajasthan</p>
            <p>50 Districts</p>
          </div>
          <div className="india">
            {/* svg of India */}
            <p>India</p>
            <p>29 States 08 UT's</p>
          </div>
        </div>
        <div>
          <div className="overseas">
            {/* svg of overseas */}
            <p>Overseas</p>
            <p>25+ Countries</p>
          </div>
          <div className="overall">
            {/* svg of overall */}
            <p>Overall</p>
            <p>1500+ Team Members</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;
