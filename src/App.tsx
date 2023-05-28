import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
	const [currentMessage, setCurrentMessage] = useState<string>("");
	const [connectionStatus, setConnectionStatus] = useState<string>("Closed");
	const [messageHistory, setMessageHistory] = useState<string[]>([]);
	const client = useRef<WebSocket | null>(null);

	const updateMessageHistory = useCallback(
		(message: string) => {
			setMessageHistory((prevMessageHistory) => [
				message,
				...prevMessageHistory,
			]);
		},
		[setMessageHistory]
	);

	useEffect(() => {
		const socket = new WebSocket("ws://localhost:3001/");

		socket.onopen = () => {
			setConnectionStatus("Open");
			console.log("Connected!");
		};

		socket.onmessage = (event) => {
			updateMessageHistory(event.data);
		};

		client.current = socket;

		return () => {
			socket.close();
		};
	}, [updateMessageHistory]);

	function handleSendMessage(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (currentMessage === "") return;
		client.current?.send(currentMessage);
		setCurrentMessage("");
	}

	return (
		<div className="container">
			<div className="messages-container">
				<ul>
					{messageHistory.map((value) => {
						return <li>{value}</li>;
					})}
				</ul>
			</div>
			<div className="sender-container">
				<form action="submit" onSubmit={handleSendMessage}>
					<input
						type="text"
						value={currentMessage}
						onChange={(event) => setCurrentMessage(event.target.value)}
					/>
					<button
						type="submit"
						disabled={connectionStatus === "Open" ? false : true}
					>
						Send
					</button>
				</form>
			</div>
		</div>
	);
}

export default App;
