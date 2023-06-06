import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

export const userStore = configureStore({
	reducer: {
		user: userSlice.reducer,
	},
});

export default userStore;

export type RootState = ReturnType<typeof userStore.getState>;

export type AppDispatch = typeof userStore.dispatch;
