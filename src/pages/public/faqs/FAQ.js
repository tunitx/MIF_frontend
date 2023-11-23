import React, { useEffect } from "react";
import FAQs from "../home/FAQs";
import { faqs_page } from "../../../utils/constants";

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <FAQs faqs={faqs_page} viewMore={false} />
    </div>
  );
};

export default FAQ;
