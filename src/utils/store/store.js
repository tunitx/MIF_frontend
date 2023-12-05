import { configureStore } from "@reduxjs/toolkit";
import contactQueriesSlice from "./slices/contactQueriesSlice";

const store = configureStore({
  reducer: {
    ContactQueriesSlice: contactQueriesSlice,
  },
});

export default store;
