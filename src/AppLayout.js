// import React from "react";
// import Navbar from "./components/Navbar";
// import { Outlet } from "react-router-dom";
// import Footer from "./components/Footer";
// import { Provider } from "react-redux";
// import store from "./utils/store/store";

// const AppLayout = () => {
//   return (
//     // Providing the redux store to the app
//     <Provider store={store}>
//       <div>
//         <Outlet />
//       </div>
//     </Provider>
//   );
// };

// export default AppLayout;
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import store from "./utils/store/store";
import UserContext from "./utils/context/UserContext"; // adjust the import path according to your project structure

const AppLayout = () => {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || null);

  return (
    // Providing the redux store to the app
    <Provider store={store}>
      <UserContext.Provider value={{ userName, setUserName }}>
        <div>
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

export default AppLayout;