import react from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./src/AppLayout";
import Home from "./src/pages/home/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ListOfMembers from "./src/pages/list_of_members/ListOfMembers";
import FormAddNewMember from "./src/components/admin/FormAddNewMember";
import Press from "./src/pages/press/Press";
import MissionAndVision from "./src/pages/mission-and-vision/MissionAndVision";

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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoutes} />);
