import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { SignalRProvider } from "./components/SignalR/SignalRContext.tsx";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import userStore from "./redux/userStore.ts";
import { Toaster } from "react-hot-toast";
import { Routes } from "@generouted/react-router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<SignalRProvider>
			<Provider store={userStore}>
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{ colorScheme: "dark" }}
				>
					<Routes />
					<Toaster />
				</MantineProvider>
			</Provider>
		</SignalRProvider>
	</React.StrictMode>
);
