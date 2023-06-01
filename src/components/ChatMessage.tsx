import { Avatar } from "@mantine/core";
import { ReactNode } from "react";

export type ChatMessageData = {
	username: string;
	message: string;
};

function ChatMessage({
	username,
	children,
}: {
	username: string;
	children?: ReactNode;
}) {
	return (
		<div className="bg-slate-900 p-2 rounded-xl">
			<div className="flex items-center">
				<Avatar size={"xs"} />
				<div className="text-xs">
					<strong>{username}</strong>
				</div>
			</div>
			<div className="break-words">{children ?? ""}</div>
		</div>
	);
}

export default ChatMessage;
