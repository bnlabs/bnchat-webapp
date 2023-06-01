import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Button, Input } from "@mantine/core";
import ChatMessage, { ChatMessageData } from "./ChatMessage";
import socket from "../socket";
import ChatSender from "./ChatSender";

function ChatContainer() {
	const [connectionStatus, setConnectionStatus] = useState<string>("Closed");
	const [messageHistory, setMessageHistory] = useState<ChatMessageData[]>([]);
	const [username, setUsername] = useState<string>("");
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
		function onConnect() {
			setConnectionStatus("Open");
		}

		function onDisconnect() {
			setConnectionStatus("Closed");
		}

		function onMessage(value: string) {
			updateMessageHistory(JSON.parse(value));
		}

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("message", onMessage);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
			socket.off("message", onMessage);
			socket.disconnect();
		};
	}, [updateMessageHistory]);

	useEffect(() => {
		messageWindow.current?.scrollTo(0, messageWindow.current.scrollHeight);
	}, [messageHistory]);

	function handleSendMessage(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (event.currentTarget.message.value === "") return;

		socket.emit("message", {
			username: username,
			message: event.currentTarget.message.value,
		});
	}

	function handleSetUsername(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		socket.connect();
		setUsername(event.currentTarget.username.value);
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
							name="username"
							disabled={username === "" ? false : true}
							placeholder="Username"
						></Input>
						<Button type="submit" disabled={username === "" ? false : true}>
							Connect
						</Button>
					</form>
				</div>
			</div>
			<div className="flex flex-1 w-full rounded bg-slate-800">
				<ul
					ref={messageWindow}
					className="flex flex-col-reverse m-0 flex-1 h-96 p-2 overflow-y-scroll list-none no-scrollbar"
				>
					{messageHistory.map((messageData, index) => {
						return (
							<li className="my-1" key={index.toString()}>
								<ChatMessage username={messageData.username}>
									{messageData.message}
								</ChatMessage>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="flex justify-center rounded mt-2 bg-slate-800 p-2">
				<ChatSender
					disabled={connectionStatus !== "Open" || username === ""}
					handleSendMessage={handleSendMessage}
				/>
			</div>
		</div>
	);
}

export default ChatContainer;
