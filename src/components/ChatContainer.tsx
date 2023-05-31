import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Button, Input } from "@mantine/core";
import ChatMessage, { ChatMessageData } from "./ChatMessage";

function ChatContainer() {
	const [currentMessage, setCurrentMessage] = useState<string>("");
	const [connectionStatus, setConnectionStatus] = useState<string>("Closed");
	const [messageHistory, setMessageHistory] = useState<ChatMessageData[]>([]);
	const [username, setUsername] = useState<string>("");
	const client = useRef<WebSocket | null>(null);
	const messageWindow = useRef<HTMLUListElement | null>(null);

	const updateMessageHistory = useCallback(
		(message: ChatMessageData) => {
			setMessageHistory((prevMessageHistory) => [
				message,
				...prevMessageHistory,
			]);
		},
		[setMessageHistory]
	);

	useEffect(() => {
		const socket = new WebSocket("wss://ws.pancho.moe");

		socket.onopen = () => {
			setConnectionStatus("Open");
			console.log("Connected!");
		};

		socket.onmessage = (event) => {
			updateMessageHistory(JSON.parse(event.data));
		};

		client.current = socket;

		return () => {
			socket.close();
		};
	}, [updateMessageHistory]);

	useEffect(() => {
		messageWindow.current?.scrollTo(0, messageWindow.current.scrollHeight);
	}, [messageHistory]);

	function handleSendMessage(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (currentMessage === "") return;
		client.current?.send(
			JSON.stringify({ message: currentMessage, username: username })
		);
		setCurrentMessage("");
	}

	function handleSetUsername(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		// @ts-expect-error since we're using a form, we can assume that the first element is the input
		setUsername(event.target[0].value);
	}

	function clearMessageHistory() {
		setMessageHistory([]);
	}

	return (
		<div className="flex flex-1 max-w-5xl flex-col items-center p-4 bg-slate-950 rounded-xl">
			<div>
				<strong>Connection Status:</strong> {connectionStatus}
				<div className="flex items-center">
					<strong className="mr-2">Username:</strong>
					<form className="flex" action="submit" onSubmit={handleSetUsername}>
						<Input
							className="mb-2 mr-2"
							disabled={username === "" ? false : true}
						></Input>
						<Button type="submit" disabled={username === "" ? false : true}>
							Set username
						</Button>
					</form>
				</div>
			</div>
			<div className="flex flex-1 w-full rounded bg-slate-800">
				<ul
					ref={messageWindow}
					className="flex flex-col-reverse m-0 flex-1 h-96 p-2 overflow-y-scroll list-none no-scrollbar"
				>
					{messageHistory.map((message) => {
						return (
							<li className="my-1">
								<ChatMessage chatMessageData={message} />
							</li>
						);
					})}
				</ul>
			</div>
			<div className="flex justify-center rounded mt-2 bg-slate-800 p-2">
				<form
					className="flex flex-1"
					action="submit"
					onSubmit={handleSendMessage}
				>
					<Input
						type="text"
						value={currentMessage}
						className="flex-1"
						onChange={(event) => setCurrentMessage(event.target.value)}
						disabled={
							(connectionStatus === "Open" ? false : true) ||
							(username === "" ? true : false)
						}
					/>
					<Button
						className="mx-2"
						type="submit"
						disabled={
							(connectionStatus === "Open" ? false : true) ||
							(username === "" ? true : false)
						}
					>
						Send
					</Button>
					<Button color="red" onClick={clearMessageHistory}>
						Clear chat
					</Button>
				</form>
			</div>
		</div>
	);
}

export default ChatContainer;
