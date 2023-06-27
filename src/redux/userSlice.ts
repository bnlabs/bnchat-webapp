import { createSlice } from "@reduxjs/toolkit/";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserState = {
	username: string | null;
	id: string | null;
	avatar: string | null;
};

const initialState: UserState = {
	username: null,
	id: null,
	avatar: null
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserState>) => {
			state.username = action.payload.username;
			state.id = action.payload.id;
			state.avatar = action.payload.avatar;
		},
	},
});

export const { setUser } = userSlice.actions;

export default userSlice;
