// usersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      console.log(action);
      state.user = action.payload;
    },
    removeUser: (state) => (state.user = {}),
  },
});

export const { setUser, removeUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
