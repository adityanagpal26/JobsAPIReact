import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = storedUser
  ? { name: storedUser.name, token: storedUser.token, isMember: true }
  : { name: "", token: "", isMember: true };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { name, token } = action.payload;
      localStorage.setItem("user", JSON.stringify({ name, token }));
      state.name = name;
      state.token = token;
    },
    logoutUser: (state) => {
      localStorage.removeItem("user");
      state.name = "";
      state.token = "";
    },
    toggleIsMember: (state) => {
      state.isMember = !state.isMember;
    },
  },
});

export const { setUser, logoutUser, toggleIsMember } = userSlice.actions;

export default userSlice.reducer;
