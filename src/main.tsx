import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { SignalRProvider } from "./components/SignalR/SignalRContext.tsx";
import Login from "./routes/auth/Login.tsx";
import Signup from "./routes/auth/Signup.tsx";
import { Button, MantineProvider } from "@mantine/core";
import Chat from "./routes/Chat.tsx";
import { Provider } from "react-redux";
import userStore from "./redux/userStore.ts";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<div className="flex justify-center h-screen items-center gap-2">
				<Link to="/app">
					<Button>Chat</Button>
				</Link>
				<Link to="/auth/login">
					<Button>Login</Button>
				</Link>
			</div>
		),
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
					<Toaster />
				</MantineProvider>
			</Provider>
		</SignalRProvider>
	</React.StrictMode>
);
