import { Avatar } from "@mantine/core";

export type ChatMessageData = {
	message: string;
	username: string;
};

function ChatMessage({ chatMessageData}: { chatMessageData: ChatMessageData }) {
	return (
		<div className="bg-slate-900 p-2 rounded-xl">
			<div className="flex items-center">
				<Avatar size={"xs"} />
				<div className="text-xs">
					<strong>{chatMessageData.username}</strong>
				</div>
			</div>
			<div className="break-words">{chatMessageData.message}</div>
		</div>
	);
}

export default ChatMessage;
