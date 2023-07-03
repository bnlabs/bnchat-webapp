import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import userMapSlice from "./userMapSlice";
import conversationSlice from "./conversationSlice";

export const userStore = configureStore({
	reducer: {
		user: userSlice.reducer,
		conversation: conversationSlice.reducer,
		userMap: userMapSlice.reducer
	},
});

export default userStore;

export type RootState = ReturnType<typeof userStore.getState>;

export type AppDispatch = typeof userStore.dispatch;
