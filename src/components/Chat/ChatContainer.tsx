import {
	FormEvent,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { Button, Input } from "@mantine/core";
import ChatMessage from "./ChatMessage";
import ChatSender from "./ChatSender";
import SignalRContext from "../SignalR/SignalRContext";

type Message = {
	senderId: string;
	content: string;
	senderName: string;
	conversationId: string;
	timeStamp: string;
	id: string;
};

function ChatContainer() {
	const [connectionStatus, setConnectionStatus] = useState<string>("Closed");
	const [messageHistory, setMessageHistory] = useState<Message[]>([]);
	const [username, setUsername] = useState<string>("");
	const [conversationId, setConversationId] = useState<string>("");
	const messageWindow = useRef<HTMLUListElement | null>(null);

	const updateMessageHistory = useCallback(
		(message: Message) => {
			setMessageHistory((prevMessageHistory) => [
				message,
				...prevMessageHistory,
			]);
		},
		[setMessageHistory]
	);

	const connection = useContext(SignalRContext);

	useEffect(() => {
		connection
			?.start()
			.then(() => {
				console.log("Connected!");
				connection.on("ReceiveMessage", onMessage);
				setConnectionStatus("Open");
			})
			.catch((e) => console.log("Connection failed: ", e));

		function onMessage(value: Message) {
			console.log(value);
			updateMessageHistory(value);
		}
	}, [updateMessageHistory, connection]);

	useEffect(() => {
		messageWindow.current?.scrollTo(0, messageWindow.current.scrollHeight);
	}, [messageHistory]);

	function handleSendMessage(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (event.currentTarget.message.value === "") return;

		connection?.invoke("SendMessage", {
			senderId: "310c993a-fa98-4929-a1ec-2af7bbae9ab0",
			senderName: username,
			content: event.currentTarget.message.value,
			conversationId,
		});
	}

	function handleSetUsername(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setUsername(event.currentTarget.username.value);
	}

	function handleSetConversationId(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		connection?.invoke("JoinGroup", event.currentTarget.conversationId.value);
		setConversationId(event.currentTarget.conversationId.value);
	}

	return (
		<div className="flex flex-1 max-w-5xl flex-col items-center p-4 bg-slate-950 rounded-xl">
			<div>
				<label className="mb-2">Connection Status: {connectionStatus}</label>
				<div>
					<form
						className="flex items-center mb-2"
						action="submit"
						onSubmit={handleSetUsername}
					>
						<label className="mr-2">Username:</label>
						<Input
							className="mr-2"
							name="username"
							disabled={username === "" ? false : true}
							placeholder="Username"
						></Input>
						<Button type="submit" disabled={username === "" ? false : true}>
							Set username
						</Button>
					</form>
					<form
						className="flex mb-2 items-center"
						action="submit"
						onSubmit={handleSetConversationId}
					>
						<label className="mr-2">Conversation:</label>
						<Input
							className="mr-2"
							placeholder="Conversation"
							name="conversationId"
							disabled={
								(conversationId === "" ? false : true) ||
								(username === "" ? true : false)
							}
						></Input>
						<Button
							type="submit"
							disabled={
								(conversationId === "" ? false : true) ||
								(username === "" ? true : false)
							}
						>
							Join conversation
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
								<ChatMessage
									username={messageData.senderName}
									timestamp={messageData.timeStamp}
								>
									{messageData.content}
								</ChatMessage>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="flex justify-center rounded mt-2 bg-slate-800 p-2">
				<ChatSender
					disabled={username === ""}
					handleSendMessage={handleSendMessage}
				/>
			</div>
		</div>
	);
}

export default ChatContainer;
