import { createSlice } from "@reduxjs/toolkit/";
import type { PayloadAction } from "@reduxjs/toolkit";


type user = {
	id:string
	pictureUrl: string
	username: string
}

type UserMapState = {
	userMap: user[]
};

const initialState:UserMapState = {
	userMap: []
};

const userMapSlice = createSlice({
	name: "userMap",
	initialState,
	reducers: {
		addUserToMap: (state, action: PayloadAction<any>) => {
			const newUser = action.payload;
			return {
				...state,
				userMap: {
					...state.userMap,
					newUser
				}
			}
		},
		setUserMap: (state, action: PayloadAction<any>) => {
			return {
				...state,
				userMap : action.payload
			}
		}
	}
});

export const { setUserMap, addUserToMap } = userMapSlice.actions;

export default userMapSlice;

