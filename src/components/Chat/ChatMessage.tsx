import { Avatar } from "@mantine/core";
import { ReactNode } from "react";

const ChatMessage = ({
	username,
	timestamp,
	children,
}: {
	username: string;
	timestamp: string;
	children?: ReactNode;
}) => {
	return (
		<div className="bg-slate-900 p-2 rounded-xl">
			<div className="flex items-center">
				<div className="flex items-center text-xs mr-2">
					<Avatar size={"xs"} />
					<strong>{username}</strong>
				</div>
				<div>
					<span className="text-xs text-gray-400">
						{new Date(timestamp).toLocaleTimeString()}
					</span>
				</div>
			</div>
			<div className="break-words">{children ?? ""}</div>
		</div>
	);
};

export default ChatMessage;
