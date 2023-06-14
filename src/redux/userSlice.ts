import { createSlice } from "@reduxjs/toolkit/";
import type { PayloadAction } from "@reduxjs/toolkit";

type User = {
  username: string;
  id: string;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: null,
    id: null,
  },
  reducers: {
    setUser: (state: any, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const actions = userSlice.actions;

export default userSlice;
