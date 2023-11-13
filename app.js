import react from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./src/AppLayout";
import Home from "./src/pages/home/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ListOfMembers from "./src/pages/list_of_members/ListOfMembers";
import FormAddNewMember from "./src/components/admin/FormAddNewMember";
import Press from "./src/pages/press/Press";
import MissionAndVision from "./src/pages/mission-and-vision/MissionAndVision";
import Gallery from "./src/pages/gallery/Gallery";
import About from "./src/pages/about/About";
import MembershipAndFees from "./src/pages/membership_and_fees/MembershipAndFees";
import StudyAbroad from "./src/pages/study_abroad/StudyAbroad";
import FAQ from "./src/pages/faqs/FAQ";
import FreeWebsite from "./src/pages/free_website/FreeWebsite";
import BookMarwadiVyapari from "./src/pages/book_marwadi_vyapari/BookMarwadiVyapari";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/list-of-members",
        element: <ListOfMembers />,
        children: [
          {
            path: "/list-of-members/admin/:id",
            element: <FormAddNewMember />,
          },
        ],
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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoutes} />);
