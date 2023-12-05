import { createSlice } from "@reduxjs/toolkit";

const contactQueriesSlice = createSlice({
  name: "ContactQueriesSlice",
  initialState: {
    queries: [],
  },
  reducers: {
    populate_queries: (state, action) => {
      state.queries = action.payload;
    },
    delete_query: (state, action) => {
      state.queries = state.queries.filter(({ _id }) => {
        return action.payload !== _id;
      });
    },
  },
});

export default contactQueriesSlice.reducer;

export const { populate_queries, delete_query } = contactQueriesSlice.actions;
