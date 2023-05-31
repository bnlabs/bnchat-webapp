import ChatContainer from "./components/ChatContainer";
import { MantineProvider } from "@mantine/core";

function App() {
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{ colorScheme: "dark" }}
		>
			<div className="flex justify-center m-4">
				<ChatContainer />
			</div>
		</MantineProvider>
	);
}

export default App;

