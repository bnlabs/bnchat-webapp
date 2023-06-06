import { createSlice } from "@reduxjs/toolkit/";

const userSlice = createSlice({
    name: 'user',
    initialState: {
      username: ""
    },
    reducers: {
      setUsername: (state, action) => {
        return action.payload;
      }
    }
  })

export const actions = userSlice.actions;

export default userSlice;
