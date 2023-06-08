import { createSlice } from "@reduxjs/toolkit/";
import type { PayloadAction } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
      username: ""
    },
    reducers: {
      setUsername: (state:any, action: PayloadAction<string>) => {
        state.username = action.payload;
      }
    }
  })

export const actions = userSlice.actions;

export default userSlice;
