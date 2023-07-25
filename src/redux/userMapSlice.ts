import { createSlice } from "@reduxjs/toolkit/";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserMapState = {
  userMap: user[];
};

const initialState: UserMapState = {
  userMap: [],
};

const userMapSlice = createSlice({
  name: "userMap",
  initialState,
  reducers: {
    addUserToMap: (state, action: PayloadAction<user>) => {
      const newUser = action.payload;
      const userAlreadyExist = state.userMap.filter(u => u.id === newUser.id).length > 0;

      if(userAlreadyExist){ return; }

      return {
        ...state,
        userMap: [
          ...state.userMap,
          newUser,
        ],
      };
    },
    setUserMap: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        userMap: action.payload,
      };
    },
  },
});

export const { setUserMap, addUserToMap } = userMapSlice.actions;

export default userMapSlice;
