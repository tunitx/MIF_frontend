import react from "react";
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

// admin

import Admin from "./src/Admin";
import AdminPress from "./src/pages/admin/press/Press";
import AdminListOfMembers from "./src/pages/admin/list-of-members/ListOfMembers";
import AdminAdvertismentBoard from "./src/pages/admin/advertisment-board/AdvertismentBoard";

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
        ],
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
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
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoutes} />);
