import react, { useContext } from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./src/AppLayout";
import Home from "./src/pages/public/home/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ListOfMembers from "./src/pages/public/list_of_members/ListOfMembers";
import FormAddNewMember from "./src/pages/admin/list-of-members/FormAddNewMember";
import Press from "./src/pages/public/press/Press";
import MissionAndVision from "./src/pages/public/mission-and-vision/MissionAndVision";
import Gallery from "./src/pages/public/gallery/Gallery";
import About from "./src/pages/public/about/About";
import MembershipAndFees from "./src/pages/public/membership_and_fees/MembershipAndFees";
import StudyAbroad from "./src/pages/public/study_abroad/StudyAbroad";
import FAQ from "./src/pages/public/faqs/FAQ";
import FreeWebsite from "./src/pages/public/free_website/FreeWebsite";
import BookMarwadiVyapari from "./src/pages/public/book_marwadi_vyapari/BookMarwadiVyapari";
import FormAddAdvertisment from "./src/pages/admin/advertisment-board/FormAddAdvertisment";
import GovRegistration from "./src/pages/public/government_registration/GovRegistration";
import CoreMembersMIF from "./src/pages/public/mif_core_members/CoreMembersMIF";
import Public from "./src/Public";
import dotenv from "dotenv";
dotenv.config();

import Matrimony_Home from "./src/pages/public/marwadi_matrimony/Home";
import BiodataTable from "./src/pages/public/marwadi_matrimony/MarriageUserBiodataCard";

// admin
// import Adverisement from "./src/pages/admin/advertisment-board/Advertisment";
import Advertisements from "./src/pages/admin/advertisment-board/Advertisements";
import Presses from "./src/pages/admin/press/Allpress";
import Admin from "./src/Admin";
import Members from "./src/pages/admin/list-of-members/Members";
import AdminPress from "./src/pages/admin/press/Press";
import AdminListOfMembers from "./src/pages/admin/list-of-members/ListOfMembers";
import AdminAdvertismentBoard from "./src/pages/admin/advertisment-board/AdvertismentBoard";
import Contact from "./src/pages/public/contact/Contact";
import Matrimony from "./src/pages/public/marwadi_matrimony/Matrimony";
import path from "path-browserify";
import Registration from "./src/pages/public/marwadi_matrimony/Registration";
import SearchBiodata from "./src/pages/public/marwadi_matrimony/SearchBiodata";
import Disclaimer from "./src/pages/public/disclaimer/Disclaimer";
import ContactQueries from "./src/pages/admin/contact_queries/ContactQueries";
import AdminHome from "./src/pages/admin/home/Home";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Public />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/list-of-members",
            element: <ListOfMembers />,
          },
          {
            path: "/press",
            element: <Press />,
          },
          {
            path: "/mission-and-vision",
            element: <MissionAndVision />,
          },
          {
            path: "/gallery",
            element: <Gallery />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/membership-and-fees",
            element: <MembershipAndFees />,
          },
          {
            path: "/study-abroad",
            element: <StudyAbroad />,
          },
          {
            path: "/disclaimer",
            element: <Disclaimer />,
          },
          {
            path: "/faqs",
            element: <FAQ />,
          },
          {
            path: "/free-website",
            element: <FreeWebsite />,
          },
          {
            path: "/book-marwadi-vyapari",
            element: <BookMarwadiVyapari />,
          },
          {
            path: "/government-registration",
            element: <GovRegistration />,
          },
          {
            path: "/mif-core-members",
            element: <CoreMembersMIF />,
          },
          {
            path: "/contact",
            element: <Contact />,
          },
          {
            path: "/matrimony",
            element: <Matrimony />,
            children: [
              {
                path: "/matrimony",
                element: <Matrimony_Home />,
              },
              {
                path: "add-biodata",
                element: <Registration />,
              },
              {
                path: "search-biodata",
                element: <SearchBiodata />,
              },
              {
                path: "biodata",
                element: <BiodataTable />,
              },
            ],
          },
        ],
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            path: "/admin",
            element: <AdminHome />,
          },
          {
            path: "press",
            element: <AdminPress />,
          },
          {
            path: "list-of-members",
            element: <AdminListOfMembers />,
          },
          {
            path: "advertisment-board",
            element: <AdminAdvertismentBoard />,
          },
          {
            path: "contact-queries",
            element: <ContactQueries />,
          },
          {
            path: "members",
            element: <Members />,
          },
          {
            path: "advertisements",
            element: <Advertisements />,
          },
          {
            path: "all-press",
            element: <Presses />,
          },


        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoutes} />);
