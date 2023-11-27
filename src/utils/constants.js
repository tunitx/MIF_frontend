import company1 from "../../assests/images/company1.png.webp";
import company2 from "../../assests/images/company2.jpeg.webp";
import company3 from "../../assests/images/company3.jpeg.webp";

import aboutus_economy from "../../assests/images/aboutus_economy.png";
import aboutus_entrepreneur from "../../assests/images/aboutus_entrepreneur.png";
import aboutus_network from "../../assests/images/aboutus_network.png";
import aboutus_networking from "../../assests/images/aboutus_networking.png";
import aboutus_team from "../../assests/images/aboutus_team.png";
import aboutus_entrepreneur from "../../assests/images/aboutus_entrepreneur.png";
import aboutus_skill_development from "../../assests/images/aboutus_skill-development.png";
import aboutus_social_care from "../../assests/images/aboutus_social-care.png";
import aboutus_women_entrepreneur from "../../assests/images/aboutus_women_entrepreneur.png";

export const GET_ALL_PRESS = "http://localhost:3000/press/all";
export const POST_PRESS = "http://localhost:3000/press/new";
export const GET_YEARS_LIST = "http://localhost:3000/press/yearsList";
export const POST_MEMBER_DETAILS = "http://localhost:3000/postMemberDetails";
export const GET_ALL_MEMBER = "http://localhost:3000/getMemberDetails";

export const GET_ADVERTISMENTS = "http://localhost:3000/advertisment/all";
export const POST_ADVERTISMENT = "http://localhost:3000/advertisment/new";

export const GET_MEMBERTYPES_LIST =
  "http://localhost:3000/member/memberType/all";
export const POST_MEMBERTYPE = "http://localhost:3000/member/memberType/new";

export const GET_AVAILABLE_MEMBERTYPES_LIST =
  "http://localhost:3000/member/typesList";

export const SIGN_IN_URL = "http://localhost:3000/admin/signin";

// export const GET_ALL_PRESS =
//   "https://marvaadi-backend-api.onrender.com/press/all";
// export const POST_PRESS = "https://marvaadi-backend-api.onrender.com/press/new";
// export const GET_YEARS_LIST =
//   "https://marvaadi-backend-api.onrender.com/press/yearsList";
// export const POST_MEMBER_DETAILS =
//   "https://marvaadi-backend-api.onrender.com/postMemberDetails";
// export const GET_ALL_MEMBER =
//   "https://marvaadi-backend-api.onrender.com/getMemberDetails";

// export const GET_ADVERTISMENTS =
//   "https://marvaadi-backend-api.onrender.com/advertisment/all";
// export const POST_ADVERTISMENT =
//   "https://marvaadi-backend-api.onrender.com/advertisment/new";

// export const GET_MEMBERTYPES_LIST =
//   "https://marvaadi-backend-api.onrender.com/member/memberType/all";
// export const POST_MEMBERTYPE =
//   "https://marvaadi-backend-api.onrender.com/member/memberType/new";

// export const GET_AVAILABLE_MEMBERTYPES_LIST =
//   "https://marvaadi-backend-api.onrender.com/member/typesList";

// export const SIGN_IN_URL =
//   "https://marvaadi-backend-api.onrender.com/admin/signin";

export const trusteeMembers = [
  {
    name: "Vijay Garg",
    profession: "Chartered Accountant",
  },
  {
    name: "Prashant Agarwal",
    profession: "Insolvency Professional",
  },
  {
    name: "Mahesh Deora",
    profession: "Chartered Accountant",
  },
  {
    name: "Shri Niwas Khetawat",
    profession: "Real Estate Business",
  },
  {
    name: "Sushil Kumar Jalan",
    profession: "Motivational Speaker",
  },
  {
    name: "Smt. Kusum Jalan",
    profession: "Paper Business",
  },
  {
    name: "Vinod Kumar Singhal",
    profession: "Chartered Accountant",
  },
  {
    name: "Kailash Chandra Lohiya",
    profession: "Chartered Accountant",
  },
  {
    name: "Jitendra Agarwal",
    profession: "Chartered Accountant",
  },
  {
    name: "Ritu Sharma",
    profession: "Astrologer",
  },
  {
    name: "Mukesh Verma",
    profession: "Business",
  },
  {
    name: "Mahendra Khandelwal",
    profession: "Company Secretary",
  },
  {
    name: "Sunil Agarwal",
    profession: "Business",
  },
];

export const advisoryMembers = [
  {
    name: "Satish Kumar Gupta",
    profession: "Chartered Accountant",
  },
];

export const activeLifeMembers = [
  {
    name: "Abhishek Khandelwal",
    profession: "Tax Consultant",
  },
  {
    name: "Shantanu Singh",
    profession: "Consultant on Foreign Study",
  },
  {
    name: "Ashok Kumawat",
    profession: "Gems & Jewellery Business",
  },
  {
    name: "Mahesh Kumar Tiwari",
    profession: "Advocate",
  },
  {
    name: "Shubham Khandelwal",
    profession: "Tax Consultant",
  },
  {
    name: "Abhishek Soni",
    profession: "Tax Consultant",
  },
  {
    name: "Ashok Kumar Jalan",
    profession: "Paper Business",
  },
  {
    name: "Dinesh Kumar Jain",
    profession: "Chartered Accountant",
  },
  {
    name: "Bhagwati Prasad Kyal",
    profession: "Chartered Accountant",
  },
  {
    name: "Saurabh Agarwal",
    profession: "Chartered Accountant",
  },
  {
    name: "Laxmi Narayan Kumawat",
    profession: "Lift Elevator Supplier",
  },
];

export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
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

export const REGISTRATIONS = [
  {
    title: "12A_REGISTRATION UNDER INCOME TAX ACT",
    subTitle: "12A",
    ministry: "MINISTRY OF FINANCE, GOVT. OF INDIA",
    docLink:
      "https://drive.google.com/file/d/1JnMgkp_jLBKpNMWkw0XicfUzE9Syzhjv/preview",
  },
  {
    title: "80G_REGISTRATION UNDER INCOME TAX ACT",
    subTitle: "80G",
    ministry: "MINISTRY OF FINANCE, GOVT. OF INDIA",
    docLink:
      "https://drive.google.com/file/d/1hsg3eqT0DCrFVxUchSoykKeXtNTLXJEZ/preview",
  },
  {
    title: "CERTIFICATE OF INCORPORATION_REGISTRATION UNDER COMPANIES ACT",
    subTitle: "COI",
    ministry: "MINISTRY OF CORPORATE AFFAIRS, GOVT. OF INDIA",
    docLink:
      "https://drive.google.com/file/d/1LXIkJlI26bTOgBhFw-3KZ7mPWHjmtR99/preview",
  },
  {
    title: "CSR_REGISTRATION UNDER COMPANIES ACT",
    subTitle: "CSR",
    ministry: "MINISTRY OF CORPORATE AFFAIRS, GOVT. OF INDIA",
    docLink:
      "https://drive.google.com/file/d/1L-ai81tsd1GdJNt9KhMbtPlt43F5vg7p/preview",
  },
  {
    title: "DARPAN ID_REGISTRATION UNDER NITI AAYOG",
    subTitle: "DARPAN ID",
    ministry: "NITI AAYOG, GOVT OF INDIA",
    docLink:
      "https://drive.google.com/file/d/1TybcxwOus4M9ZeCkpRQQ5rt08kkC4jf0/preview",
  },
  {
    title: "PAN_REGISTRATION UNDER INCOME TAX ACT",
    subTitle: "PAN",
    ministry: "MINISTRY OF FINANCE, GOVT. OF INDIA",
    docLink:
      "https://drive.google.com/file/d/1oXudVoPc6kw5lo1hKCyOQohrElBvr9Qo/preview",
  },
  {
    title: "CERTIFICATE OF RECOGNITION – STARTUP  INDIA",
    subTitle: "STARTUP  INDIA",
    ministry: "MINISTRY OF COMMERCE & INDUSTRY, GOVT. OF INDIA",
    docLink:
      "https://drive.google.com/file/d/1Mg5_MxnpC9SnqmBtCfQdUixcgZ2PE782/preview",
  },
];

export const companies = [
  {
    img: company1,
    title: "Smart E Invites",
    description:
      "Say goodbye to boring, generic invitations and hello to the artfully crafted and environmentally responsible cards from Smart E Invites. Our digital ecards showcase a feast of designs, patterns, fonts, and colors that are sure to leave a lasting impression. Modern way of invitation",
  },
  {
    img: company2,
    title: "Voice of Today Astro",
    description:
      "Voice of Today is an eminent professional with +32 years of experience in finance and IT risk who is here to help you pave your path to success through authentic predictions and guidance. They are also known as India's first Corporate Astrologer  with innumerable success stories.",
  },
  {
    img: company3,
    title: "Jeevan Lakshya Foundation",
    description:
      "Drenching the humanity with ray of LOVE, UNITY, EDUCATION and HOPE. JLF- A Ray of Sunshine, A Drop of Rain.JLF is a charitable trust organization dedicated to making a positive impact on society by addressing various social, economic, and environmental issues.",
  },
];

export const slides = [
  {
    imageSource: aboutus_network,
    title: "Bridging",
    description: "Between Businesses to Businesses and Government",
  },
  {
    imageSource: aboutus_economy,
    title: "Economic Development",
    description: "Of the state and the country",
  },
  {
    imageSource: aboutus_team,
    title: "Employment",
    description: "Opportunities to Youngsters and Women",
  },
  {
    imageSource: aboutus_networking,
    title: "Networking",
    description: "Provides Business and Social Networking Opportunities",
  },
  {
    imageSource: aboutus_entrepreneur,
    title: "Incubation",
    description: "Support to Businesses and Startup",
  },
  {
    imageSource: aboutus_skill_development,
    title: "Skill Development",
    description: "Enhancing Your Skill Development Journey",
  },
  {
    imageSource: aboutus_social_care,
    title: "Social Obligation",
    description: "Social Responsibility in Ethical Framework",
  },
  {
    imageSource: aboutus_women_entrepreneur,
    title: "Women Entrepreneurship",
    description: "Breaking Barriers and Building Success",
  },
];

export const faqs_home = [
  {
    question: "What is Marwadi International Federation?",
    answer:
      "Marwadi International Federation known as MIF is an organisation which encourages social, Cultural, Trade and Business activities amongst Marwadis throughout the world.",
  },
  {
    question: "Who can become a member of MIF?",
    answer: `Any person who is born in Rajasthan or his/her ancestors belongs to Rajasthan can become member of this organisation irrespective of his present location/residence.`,
  },
  {
    question: "Is membership restricted to any particular area?",
    answer: `NO. Anyone from any part of Rajasthan, India or world can become member if he/she fulfils the membership criteria.`,
  },
];

export const faqs_page = [
  {
    question: "What is Marwadi International Federation?",
    answer:
      "Marwadi International Federation known as MIF is an organisation which encourages social, Cultural, Trade and Business activities amongst Marwadis throughout the world.",
  },
  {
    question: "Who can become a member of MIF?",
    answer: `Any person who is born in Rajasthan or his/her ancestors belongs to Rajasthan can become member of this organisation irrespective of his present location/residence.`,
  },
  {
    question: "Is membership restricted to any particular area?",
    answer: `NO. Anyone from any part of Rajasthan, India or world can become member if he/she fulfils the membership criteria.`,
  },
  {
    question: "Is there any cast restrictions?",
    answer: `No. Anybody who qualifies for membership can become member irrespective of cast, creed, gender or profession.`,
  },
  {
    question:
      "Is it necessary to be a current resident of Rajasthan to become a member?",
    answer:
      "No. A person born in Rajasthan or his/her ancestors born in Rajasthan can become member. You can presently reside anywhere in the world to become a MIF member.",
  },
  {
    question: "How to become a member?",
    answer:
      "Just visit our website and click JOIN US. Fill the details, submit and you will become a member.",
  },
  {
    question: "Is this a registered organization?",
    answer:
      "Yes. It is a Non-Profit organization registered with Government of India and all other applicable law bodies of state and central government.",
  },
  {
    question: "Is there any paid membership?",
    answer:
      "Yes. MIF have different types of paid membership also. If you are interested to work with the organisation actively in any capacity you can be a paid member.",
  },
  {
    question: "Is membership, a yearly membership or life time membership?",
    answer: "It is lifetime membership.",
  },
  {
    question: "Is there any age limit of becoming member?",
    answer: "Yes. Minimum 18 Years or above.",
  },
  {
    question: "Can I upgarde my membership?",
    answer: "Yes. You can do so anytime.",
  },
  {
    question:
      "Can a person not born in Rajasthan and also his ancestors are not from Rajasthan, but presently residing in Rajasthan can become a member.",
    answer: "No.",
  },
  {
    question: "How can I take part in Management activites?",
    answer: "Please contact MIF office to serve in any capacity.",
  },
  {
    question: "Any tax benefits on donations made to MIF?",
    answer: "Yes, under section 80G of the Income Tax Act 1961.",
  },
  {
    question: "Is MIF eligible for CSR activites?",
    answer: "Yes, eligible for all CSR activities under companies act.",
  },
  {
    question: "Where is the registered office of MIF?",
    answer:
      "It is in Jaipur. ‘ABHYAM’, C-121 A, Lal Kothi Opp Jyoti Nagar Thana, near Rajasthan Vidhan Sabha, Jaipur, Rajasthan 302015",
  },
];
