import react from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./src/AppLayout";
import Home from "./src/pages/home/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoutes} />);
