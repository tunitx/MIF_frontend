import React, { useState } from "react";
import { slides } from "../../../utils/constants";

const Body = () => {
  const [show, setShow] = useState("eng");
  return (
    <div className="w-full p-5 relative flex justify-center my-10">
      <div className="max-w-6xl w-full flex flex-col gap-4 md:flex-row">
        <div className="border-4 border-[#d5d8dc] w-full grow">
          <div className="border-[#d5d8dc] border-b-4 flex w-full justify-between p-3 sm:justify-start sm:gap-8">
            <p
              className={`text-[#EF4D48]  text-xl hover:cursor-pointer ${
                show === "hin"
                  ? "font-bold underline underline-offset-2"
                  : "font-semibold"
              }`}
              onClick={() => {
                setShow("hin");
              }}
            >
              अ
            </p>
            <p
              className={`text-[#EF4D48]  text-xl hover:cursor-pointer ${
                show === "eng"
                  ? "font-bold underline underline-offset-2"
                  : "font-semibold"
              }`}
              onClick={() => {
                setShow("eng");
              }}
            >
              Aa
            </p>
          </div>
          <div className="p-3 pb-6">
            <p className="flex flex-col gap-3 font-Poppins">
              {show === "eng" ? (
                <>
                  <p>
                    <span style={{ fontWeight: 500, fontSize: 22 }}>
                      Marwari International Federation is a non-profit
                      organization registered by the Government of India.
                    </span>
                  </p>
                  <p>
                    <span style={{ fontWeight: 400 }}>
                      “Marwari International Federation” ( MIF ) is an
                      organization formed with the objective of developing
                      cultural, social, economic and industrial development
                      harmony among the Rajasthani’s including those living in
                      and outside Rajasthan.
                    </span>
                  </p>
                  <p>
                    <span style={{ fontWeight: 400 }}>
                      The main objective of this organization is to promote
                      social, cultural, trade and business among the people of
                      Rajasthan.
                    </span>
                  </p>
                  <p>
                    <span style={{ fontWeight: 400 }}>
                      The foundation of Rajasthan’s glorious history and bright
                      future has been laid by its artisans, confectioners and
                      businessmen.
                    </span>
                  </p>
                  <p>
                    <span style={{ fontWeight: 400 }}>
                      Due to their hard work, foresight, honesty and
                      perseverance, Rajasthani’s have been waving their flag all
                      over the world, especially in the field of trade and
                      business.
                    </span>
                  </p>
                  <p>
                    <span style={{ fontWeight: 400 }}>
                      Marwari International Federation is a unique initiative to
                      keep Rajasthani soil in the hands of all these workers who
                      by any means belong to the Rajasthani soil, even if he is
                      a resident of this place, whether he is a migrant or a
                      foreigner.
                    </span>
                  </p>
                  <p>
                    <span style={{ fontWeight: 400 }}>
                      According to various available data, about 2 crore
                      Rajasthani’s live outside Rajasthan out of which about 40
                      lakh people live in different countries outside India and
                      about one crore sixty lakh people live in different cities
                      of India.
                    </span>
                  </p>
                  <p>
                    <span style={{ fontWeight: 400 }}>
                      The objectives set out by MIF are not only to pave the way
                      for economic and industrial development in the state but
                      also to establish new dimensions on the social and
                      cultural spectrum. The languages, culture, folklore, local
                      sports and traditional practices of the state can also be
                      preserved, and this heritage can be kept safe for future
                      generations.
                    </span>
                  </p>
                  <p>
                    <span style={{ fontWeight: 400 }}>
                      The path of economic and industrial development will
                      further enrich the state and create opportunities for
                      growth and for this purpose, we will ensure to benefit the
                      people of Rajasthan with various actions taken by the
                      Central and State Governments in this direction.
                    </span>
                  </p>
                  <p>
                    <span style={{ fontWeight: 400 }}>
                      With the aim of motivating the coming generations,
                      honoring the work done by the DNA of Rajasthani soil and
                      labor qualities, not only the pre-existing talents will be
                      honored from the platform of MIF, but also the guidance
                      and support of the emerging Rajasthani talents will be
                      done from the platform of MIF.
                    </span>
                  </p>
                  <p>
                    <span style={{ fontWeight: 400 }}>
                      One and one together are eleven, taking this as the basis
                      of the statement, MIF will also run joint programs with
                      other organizations working for the upliftment of
                      Rajasthani’s at the national and international level so
                      that maximum people can be benefited.
                    </span>
                  </p>
                  <p>
                    <span style={{ fontWeight: 400 }}>
                      Come, be a part of MIF and win for all round development
                      of Rajasthan. “Walk together, grow together.”
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <p
                    dir="ltr"
                    style={{
                      lineHeight: "1.38",
                      textAlign: "justify",
                      // marginTop: "12pt",
                      // marginBottom: "12pt",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: "bold",
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      मारवाडी इन्टरनेशनल फैडरेशन,
                    </span>{" "}
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: "bold",
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      भारत सरकार
                    </span>
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      द्वारा{" "}
                    </span>
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: "bold",
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      रजिस्टर्ड
                    </span>
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      एक{" "}
                    </span>
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: "bold",
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      अलाभकारी (Non-profit) संस्था
                    </span>
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      है।
                    </span>
                  </p>
                  <p
                    dir="ltr"
                    style={{
                      lineHeight: "1.38",
                      textAlign: "justify",
                      marginTop: "12pt",
                      marginBottom: "12pt",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      “मारवाडी़ इन्टरनेशनल फेडरेशन”( MIF ) ,{" "}
                    </span>
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: "bold",
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      राजस्थानियों
                    </span>
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      जिसमें राजस्थान में रहने वाले और राजस्थान से बाहर रहने
                      वाले राजस्थानियों के बीच{" "}
                    </span>
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: "bold",
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      सांस्कृतिक सामाजिक आर्थिक एवं औद्योगिक विकास
                    </span>
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      के सामंजस्य के उद्देश्य से बनायी गई एक संस्था है।
                    </span>
                  </p>
                  <p
                    dir="ltr"
                    style={{
                      lineHeight: "1.38",
                      textAlign: "justify",
                      marginTop: "12pt",
                      marginBottom: "12pt",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      &nbsp;इस संस्था का{" "}
                    </span>
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: "bold",
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      मुख्य उद्देश्य, राजस्थानियों के बीच सामाजिक , सांस्कृतिक
                      उद्योग एवं व्यापार को बढावा देना है
                    </span>
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      ।&nbsp;
                    </span>
                  </p>
                  <p
                    dir="ltr"
                    style={{
                      lineHeight: "1.38",
                      marginTop: "12pt",
                      marginBottom: "12pt",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      &nbsp;
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      राजस्थान
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      के गौरवशाली इतिहास एवं स्वर्णिम भविष्य की आधारशिला यहाँ के
                      रणबांकुरों, कला मर्मज्ञों एवं कर्मठ उद्योगपतियों द्वारा
                      रखी गई हैं।
                    </span>
                  </p>
                  <p
                    dir="ltr"
                    style={{
                      lineHeight: "1.38",
                      textAlign: "justify",
                      marginTop: "12pt",
                      marginBottom: "12pt",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      अपनी मेहनत, दूरदर्शिता , ईमानदारी एवं जुझारुपन के बूते
                      सारे विश्व में ,
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      &nbsp;{" "}
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      विशेष रुप से,{" "}
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      &nbsp;
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      उद्योग&nbsp; एवं&nbsp; व्यापार के क्षेत्र में,
                      राजस्थानियों के नाम का परचम, शान से लहराता आ रहा है।
                    </span>
                  </p>
                  <p
                    dir="ltr"
                    style={{
                      lineHeight: "1.38",
                      textAlign: "justify",
                      marginTop: "12pt",
                      marginBottom: "12pt",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      &nbsp;
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      रा़जस्थानी मिट्टी से गढे इन सभी{" "}
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      कर्मयोद्धाओं{" "}
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      को{" "}
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      राजस्थानी मिट्टी के जोड़े
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      रखने की{" "}
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      अभिनव पहल
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      है , – “
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      मारवाडी़ इन्टरनेशनल फेडरेशन
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      ”।&nbsp; MIF उन सभी राजस्थानियों को एक मंच पर लाने की
                      प्रयास करेगा जिसकी या जिसके{" "}
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      पूर्वजों{" "}
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      में से किसी की भी{" "}
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      जन्मभूमि राजस्थान
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      है। फिर चाहे वह यहॉ का{" "}
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      निवासी हो
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      ,{" "}
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      चाहे प्रवासी
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      या{" "}
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      अनिवासी
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      हो। इन सभी को इस संस्था से जोडना{" "}
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      राजस्थानियत के भाव को सुदृढ करेगा
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      । विभिन्न उपलब्ध ऑकडों के अनुसार{" "}
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      राजस्थान से जुडे लगभग दो करोड लोग राजस्थान से बाहर रहते है
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      जिसमें से लगभग{" "}
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      चालीस लाख लोग भारत के बाहर विभिन्न देशों में
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      और{" "}
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      लगभग एक करोड साठ लाख लोग भारत के विभिन्न शहरों में
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      रहते हैं।
                    </span>
                  </p>
                  <p
                    dir="ltr"
                    style={{
                      lineHeight: "1.38",
                      marginTop: "12pt",
                      marginBottom: "12pt",
                    }}
                  >
                    <span
                      style={{
                        fontStyle: "inherit",
                        fontWeight: "inherit",
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      MIF द्वारा निर्धारित किए गए उद्देश्य न सिर्फ{" "}
                    </span>
                    <span
                      style={{
                        fontStyle: "inherit",
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      राजस्थान में आर्थिक एवं औद्योगिक विकास की राह को सुगम
                      बनाएगी
                    </span>
                    <span
                      style={{
                        fontStyle: "inherit",
                        fontWeight: "inherit",
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      वरन्{" "}
                    </span>
                    <span
                      style={{
                        fontStyle: "inherit",
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      सामाजिक एवं सांस्कृतिक फलक पर भी नए आयाम स्थापित करेगी
                    </span>
                    <span
                      style={{
                        fontStyle: "inherit",
                        fontWeight: "inherit",
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      । राजस्थान की भाषाओं, संस्कृति ,लोक रंग स्थानीय खेल
                      रीति-रिवाज प्रथाओं आदि का संरक्षण भी हो सकेगा एवं आगामी
                      पीढियों के लिए इस{" "}
                    </span>
                    <span
                      style={{
                        fontStyle: "inherit",
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      धरोहर को सुरक्षित भी रखा
                    </span>
                    <span
                      style={{
                        fontStyle: "inherit",
                        fontWeight: "inherit",
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      जा सकेगा।
                    </span>
                  </p>
                  <p
                    dir="ltr"
                    style={{
                      lineHeight: "1.38",
                      marginTop: "12pt",
                      marginBottom: "12pt",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      &nbsp;
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      आर्थिक एवं औद्योगिक विकास की राह{" "}
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      राजस्थान को और समृद्ध
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      करेगी एवं{" "}
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      रोजगार के नए अवसर भी सृजित
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      हो पाएंगें। इस हेतु केन्द्र एवं राज्य सरकार की विभिन्न
                      लोकहितकारी योजनाओं का लाभ राजस्थानियों को दिलवाने की कार्य
                      योजना तैयार की जावेगी एवं इन सूचनाओं एवं योजनाओं को
                      एकत्रित कर डेटाबेस के आधार पर{" "}
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      विश्वभर में अंतरराष्ट्रीय स्तर के, बिजिनेस सेंटर्स ,
                    </span>{" "}
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      व्यापारियों की सुविधा के लिए , स्थापित किए जावेंगे
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      ।
                    </span>
                  </p>
                  <p
                    dir="ltr"
                    style={{
                      lineHeight: "1.38",
                      // marginTop: "12pt",
                      // marginBottom: "12pt",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      &nbsp;
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      राजस्थानी भूमि
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      एवं कर्मठता के गुणों के{" "}
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      DNA से बने कर्मयोगियों के कार्यों को सम्मान कर,&nbsp; आने
                      वाली पीढियों को प्रेरित करने
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      के उद्देश्य से न सिर्फ पूर्व प्रतिष्ठित प्रतिभाओं को MIF
                      के मंच से सम्मानित किया जावेगा वरन्{" "}
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      उभरती राजस्थानी प्रतिभाओं का मार्गदर्शन एवं सहयोग
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      भी MIF के मंच से किया जावेगा।
                    </span>
                  </p>
                  <p
                    dir="ltr"
                    style={{
                      lineHeight: "1.38",
                      marginTop: "12pt",
                      marginBottom: "12pt",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      &nbsp;
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      एक और एक मिल कर ग्यारह
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      होते हैं इसी उक्ति को आधार मान कर MIF{" "}
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      राष्ट्रीय एवं अन्तर्राष्ट्रीय स्तर पर राजस्थानियों के
                      उत्थान
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      के लिए कार्य कर रही अन्य संस्थाओं के साथ मिलकर{" "}
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      साझा कार्यक्रम
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      भी चलाएगी,&nbsp; जिससे दोहराव को न्यूनतम कर{" "}
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      अधिकतम कार्य राजस्थानियों के हितार्थ
                    </span>
                    <span
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {" "}
                      हो सके।
                    </span>
                  </p>
                  <p
                    dir="ltr"
                    style={{
                      lineHeight: "1.38",
                      marginTop: "12pt",
                      marginBottom: "12pt",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      &nbsp;
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      आइए
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      ,&nbsp; MIF का हिस्सा बने और{" "}
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontWeight: "bold",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      राजस्थान के चहुमुखी विकास को गति दें
                    </span>
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        fontVariantNumeric: "normal",
                        fontVariantEastAsian: "normal",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      ।{" "}
                    </span>
                    <span
                      style={{
                        fontSize: "13.999999999999998pt",
                        fontFamily: "Arial",
                        color: "#000000",
                        backgroundColor: "transparent",
                        fontWeight: "bold",
                        fontStyle: "normal",
                        fontVariant: "normal",
                        textDecoration: "none",
                        verticalAlign: "baseline",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      “साथ चलेंगे साथ बढेंगे”
                    </span>
                  </p>
                </>
              )}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-20 py-6">
          {slides
            .filter((slide, index) => {
              return index <= 3;
            })
            .map(({ imageSource, title, description }, index) => {
              return (
                <div className="flex gap-4 items-center flex-col" key={index}>
                  <img src={imageSource} alt={title} className="w-1/3" />
                  <div className="flex flex-col gap-2">
                    <p className="font-Poppins font-bold text-[17px] text-center">
                      {title}
                    </p>
                    <p className="font-Poppins font-normal text-sm text-center">
                      {description}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
        ;
      </div>
    </div>
  );
};

export default Body;
