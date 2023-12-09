import { configureStore } from "@reduxjs/toolkit";
import contactQueriesSlice from "./slices/contactQueriesSlice";
import matrimonyUserSlice from "./slices/matrimonyUserSlice";

const store = configureStore({
  reducer: {
    ContactQueriesSlice: contactQueriesSlice,
    MatrimonyUserSlice: matrimonyUserSlice,
  },
});

export default store;
