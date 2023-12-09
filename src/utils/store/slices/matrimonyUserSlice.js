import { createSlice } from "@reduxjs/toolkit";

const matrimonyUserSlice = createSlice({
  name: "MatrimonyUserSlice",
  initialState: {
    matrimonyUser: null,
    matrimonyUserToken: null,
  },
  reducers: {
    matrimonySignIn: (state, action) => {
      state.matrimonyUser = action.payload.matrimonyUser;
      state.matrimonyUserToken = action.payload.matrimonyUserToken;
      localStorage.setItem("matrimonyUser", JSON.stringify(action.payload));
    },
    matrimonySignOut: (state, action) => {
      state.matrimonyUser = null;
      state.matrimonyUserToken = null;
      localStorage.removeItem("matrimonyUser");
    },
  },
});

export default matrimonyUserSlice.reducer;
export const { matrimonySignIn, matrimonySignOut } = matrimonyUserSlice.actions;
