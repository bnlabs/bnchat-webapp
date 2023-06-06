import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignalRProvider } from "./components/SignalR/SignalRContext.tsx";
import Login from "./routes/auth/Login.tsx";
import Signup from "./routes/auth/Signup.tsx";
import { MantineProvider } from "@mantine/core";
import Chat from "./routes/Chat.tsx";
import { Provider } from "react-redux";
import userStore from "./redux/userStore.ts";

const router = createBrowserRouter([
	{
		path: "/",
		element: <div>What are you doing here lol</div>,
	},
	{
		path: "/app",
		element: (
			<div className="flex justify-center m-4">
				<Chat />
			</div>
		),
	},
	{
		path: "/auth/login",
		element: <Login />,
	},
	{
		path: "/auth/signup",
		element: <Signup />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<SignalRProvider>
			<Provider store={userStore}>
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{ colorScheme: "dark" }}
				>
					<RouterProvider router={router} />
				</MantineProvider>
			</Provider>
		</SignalRProvider>
	</React.StrictMode>
);
