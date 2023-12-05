import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import store from "./utils/store/store";

const AppLayout = () => {
  return (
    // Providing the redux store to the app
    <Provider store={store}>
      <div>
        <Outlet />
      </div>
    </Provider>
  );
};

export default AppLayout;
