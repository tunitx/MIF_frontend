import react, { useContext, lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import AppLayout from "./src/AppLayout";
import Home from "./src/pages/public/home/Home";
import Public from "./src/Public";
import dotenv from "dotenv";
dotenv.config();

// import ListOfMembers from "./src/pages/public/list_of_members/ListOfMembers";
const ListOfMembers = lazy(() => {
  return import("./src/pages/public/list_of_members/ListOfMembers");
});

// import Press from "./src/pages/public/press/Press";

const Press = lazy(() => {
  return import("./src/pages/public/press/Press");
});

// import MissionAndVision from "./src/pages/public/mission-and-vision/MissionAndVision";

const MissionAndVision = lazy(() => {
  return import("./src/pages/public/mission-and-vision/MissionAndVision");
});

// import Gallery from "./src/pages/public/gallery/Gallery";

const Gallery = lazy(() => {
  return import("./src/pages/public/gallery/Gallery");
});

// import About from "./src/pages/public/about/About";

const About = lazy(() => {
  return import("./src/pages/public/about/About");
});

// import MembershipAndFees from "./src/pages/public/membership_and_fees/MembershipAndFees";

const MembershipAndFees = lazy(() => {
  return import("./src/pages/public/membership_and_fees/MembershipAndFees");
});

// import StudyAbroad from "./src/pages/public/study_abroad/StudyAbroad";

const StudyAbroad = lazy(() => {
  return import("./src/pages/public/study_abroad/StudyAbroad");
});

// import FAQ from "./src/pages/public/faqs/FAQ";

const FAQ = lazy(() => {
  return import("./src/pages/public/faqs/FAQ");
});

// import FreeWebsite from "./src/pages/public/free_website/FreeWebsite";

const FreeWebsite = lazy(() => {
  return import("./src/pages/public/free_website/FreeWebsite");
});

// import BookMarwadiVyapari from "./src/pages/public/book_marwadi_vyapari/BookMarwadiVyapari";

const BookMarwadiVyapari = lazy(() => {
  return import("./src/pages/public/book_marwadi_vyapari/BookMarwadiVyapari");
});

// import GovRegistration from "./src/pages/public/government_registration/GovRegistration";

const GovRegistration = lazy(() => {
  return import("./src/pages/public/government_registration/GovRegistration");
});

// import CoreMembersMIF from "./src/pages/public/mif_core_members/CoreMembersMIF";

const CoreMembersMIF = lazy(() => {
  return import("./src/pages/public/mif_core_members/CoreMembersMIF");
});

// import Matrimony_Home from "./src/pages/public/marwadi_matrimony/Home";

const Matrimony_Home = lazy(() => {
  return import("./src/pages/public/marwadi_matrimony/Home");
});

// import BiodataTable from "./src/pages/public/marwadi_matrimony/MarriageUserBiodataCard";

const BiodataTable = lazy(() => {
  return import("./src/pages/public/marwadi_matrimony/MarriageUserBiodataCard");
});

// import Contact from "./src/pages/public/contact/Contact";

const Contact = lazy(() => {
  return import("./src/pages/public/contact/Contact");
});

// import Matrimony from "./src/pages/public/marwadi_matrimony/Matrimony";

const Matrimony = lazy(() => {
  return import("./src/pages/public/marwadi_matrimony/Matrimony");
});

// import Registration from "./src/pages/public/marwadi_matrimony/Registration";

const Registration = lazy(() => {
  return import("./src/pages/public/marwadi_matrimony/Registration");
});

// import SearchBiodata from "./src/pages/public/marwadi_matrimony/SearchBiodata";

const SearchBiodata = lazy(() => {
  return import("./src/pages/public/marwadi_matrimony/SearchBiodata");
});

// import Disclaimer from "./src/pages/public/disclaimer/Disclaimer";

const Disclaimer = lazy(() => {
  return import("./src/pages/public/disclaimer/Disclaimer");
});

// admin

import Presses from "./src/pages/admin/press/Allpress";
import Admin from "./src/Admin";
import Members from "./src/pages/admin/list-of-members/Members";
import AdminPress from "./src/pages/admin/press/Press";
import AdminListOfMembers from "./src/pages/admin/list-of-members/ListOfMembers";
import AdminAdvertismentBoard from "./src/pages/admin/advertisment-board/AdvertismentBoard";
import path from "path-browserify";
import ContactQueries from "./src/pages/admin/contact_queries/ContactQueries";
import AdminHome from "./src/pages/admin/home/Home";
import PressClip from "./src/pages/admin/pressClip/PressClip";
import PressCutout from "./src/pages/admin/pressCutout/PressCutout";

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
            element: (
              <Suspense fallback={<div></div>}>
                <ListOfMembers />
              </Suspense>
            ),
          },
          {
            path: "/press",
            element: (
              <Suspense>
                <Press />
              </Suspense>
            ),
          },
          {
            path: "/mission-and-vision",
            element: (
              <Suspense>
                <MissionAndVision />
              </Suspense>
            ),
          },
          {
            path: "/gallery",
            element: (
              <Suspense>
                <Gallery />
              </Suspense>
            ),
          },
          {
            path: "/about",
            element: (
              <Suspense>
                <About />
              </Suspense>
            ),
          },
          {
            path: "/membership-and-fees",
            element: (
              <Suspense>
                <MembershipAndFees />
              </Suspense>
            ),
          },
          {
            path: "/study-abroad",
            element: (
              <Suspense>
                <StudyAbroad />
              </Suspense>
            ),
          },
          {
            path: "/disclaimer",
            element: (
              <Suspense>
                <Disclaimer />
              </Suspense>
            ),
          },
          {
            path: "/faqs",
            element: (
              <Suspense>
                <FAQ />
              </Suspense>
            ),
          },
          {
            path: "/free-website",
            element: (
              <Suspense>
                <FreeWebsite />
              </Suspense>
            ),
          },
          {
            path: "/book-marwadi-vyapari",
            element: (
              <Suspense>
                <BookMarwadiVyapari />
              </Suspense>
            ),
          },
          {
            path: "/government-registration",
            element: (
              <Suspense>
                <GovRegistration />
              </Suspense>
            ),
          },
          {
            path: "/mif-core-members",
            element: (
              <Suspense>
                <CoreMembersMIF />
              </Suspense>
            ),
          },
          {
            path: "/contact",
            element: (
              <Suspense>
                <Contact />
              </Suspense>
            ),
          },
          {
            path: "/matrimony",
            element: (
              <Suspense>
                <Matrimony />
              </Suspense>
            ),
            children: [
              {
                path: "/matrimony",
                element: (
                  <Suspense>
                    <Matrimony_Home />
                  </Suspense>
                ),
              },
              {
                path: "add-biodata",
                element: (
                  <Suspense>
                    <Registration />
                  </Suspense>
                ),
              },
              {
                path: "search-biodata",
                element: (
                  <Suspense>
                    <SearchBiodata />
                  </Suspense>
                ),
              },
              {
                path: "biodata",
                element: (
                  <Suspense>
                    <BiodataTable />
                  </Suspense>
                ),
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
          // {
          //   path: "members",
          //   element: <Members />,
          // },
          // {
          //   path: "advertisements",
          //   element: <Advertisements />,
          // },
          {
            path: "all-press",
            element: <Presses />,
          },
          {
            path: "press-clip",
            element: <PressClip />,
          },
          {
            path: "press-cutout",
            element: <PressCutout />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoutes} />);
