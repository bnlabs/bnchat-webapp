import {
	FormEvent,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { Button, Input } from "@mantine/core";
import ChatMessage from "../components/Chat/ChatMessage";
import ChatSender from "../components/Chat/ChatSender";
import SignalRContext from "../components/SignalR/SignalRContext";
import axios from "axios";
import useUserSelector from "../hooks/useUserSelector";

type MessagePayload = {
	senderId: string;
	content: string;
	senderName: string;
	conversationId: string;
	timestamp: string;
	id: string;
};

type ConversationPayload = {
	conversationId: string;
	memberIds: string[];
	messages: MessagePayload[];
};

const apiUrl = import.meta.env.VITE_API_URL;

const Chat = () => {
	const [connectionStatus, setConnectionStatus] = useState<string>("Closed");
	const [messageHistory, setMessageHistory] = useState<MessagePayload[]>([]);
	const [conversations, setConversations] = useState<ConversationPayload[]>([]);
	const [username, setUsername] = useState<string>("");
	const [conversationId, setConversationId] = useState<string>("");
	const messageWindow = useRef<HTMLUListElement | null>(null);
	const user = useUserSelector();

	const updateMessageHistory = useCallback(
		(message: MessagePayload) => {
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

		function onMessage(value: MessagePayload) {
			console.log(value);
			updateMessageHistory(value);
		}
	}, [updateMessageHistory, connection]);

	useEffect(() => {
		messageWindow.current?.scrollTo(0, messageWindow.current.scrollHeight);
	}, [messageHistory]);

	useEffect(() => {
		axios
			.get(`${apiUrl}/Message/getConversation?userId=${user.id}`, {
				withCredentials: true,
			})
			.then((response) => {
				console.log(response.data);
				setConversations(response.data);
			});
	}, [user.id]);

	function handleSendMessage(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (event.currentTarget.message.value === "") return;

		connection?.invoke("SendMessage", {
			senderId: "2d0864cb-b289-4789-8bd6-8e451855a426",
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
		<>
			<div className="w-96 bg-slate-950 rounded-xl mr-2 max-lg:hidden">
				<ul className="list-none">
					{conversations.map((conversation) => (
						<li key={conversation.conversationId}>
							<button
								onClick={() => {
									connection?.invoke("JoinGroup", conversation.conversationId);
									setConversationId(conversation.conversationId);
									setMessageHistory(
										conversation.messages.sort((a, b) => {
											return a.timestamp > b.timestamp ? -1 : 1;
										})
									);
								}}
							>
								{conversation.conversationId}
							</button>
						</li>
					))}
				</ul>
			</div>
			<div className="flex flex-1 flex-col items-center p-4 bg-slate-950 rounded-xl">
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
								disabled={username !== "" || connectionStatus === "Closed"}
								placeholder="Username"
							></Input>
							<Button
								type="submit"
								disabled={username !== "" || connectionStatus === "Closed"}
							>
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
								disabled={username === "" || connectionStatus === "Closed"}
							></Input>
							<Button
								type="submit"
								disabled={username === "" || connectionStatus === "Closed"}
							>
								Join conversation
							</Button>
						</form>
					</div>
				</div>
				<div className="flex flex-1 overflow-hidden w-full rounded bg-slate-800">
					<ul
						ref={messageWindow}
						className="flex flex-col-reverse overflow-y-scroll no-scrollbar m-0 flex-1 p-2  list-none"
					>
						{messageHistory.map((messageData, index) => {
							return (
								<li className="my-1" key={index.toString()}>
									<ChatMessage
										username={messageData.senderName}
										timestamp={messageData.timestamp}
									>
										{messageData.content}
									</ChatMessage>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="flex w-full justify-center rounded mt-2 bg-slate-800 p-2">
					<ChatSender
						disabled={username === "" || connectionStatus === "Closed"}
						handleSendMessage={handleSendMessage}
					/>
				</div>
			</div>
		</>
	);
};

export default Chat;
