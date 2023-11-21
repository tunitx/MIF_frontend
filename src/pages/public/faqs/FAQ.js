import React from "react";
import FAQs from "../home/FAQs";
import { faqs_page } from "../../../utils/constants";

const FAQ = () => {
  return (
    <div>
      <FAQs faqs={faqs_page} viewMore={false} />
    </div>
  );
};

export default FAQ;
