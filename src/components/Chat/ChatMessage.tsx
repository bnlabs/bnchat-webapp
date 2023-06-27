import { Avatar } from "@mantine/core";
import { ReactNode } from "react";

const ChatMessage = ({
	username,
	timestamp,
	avatarUrl,
	children,
}: {
	username: string;
	timestamp: string;
	avatarUrl: string | null;
	children?: ReactNode;
}) => {
	return (
		<div className="bg-slate-900 p-2 rounded-xl flex">
			<Avatar size={"lg"} className="mr-2" src={avatarUrl}/>
			<div>
				<div className="flex items-center">
					<div className="flex flex-row items-center text-xs ">
						<strong>{username}</strong>
						<span className="text-xs text-gray-400 ml-2">
							{(new Date(timestamp)).toLocaleString('en-UK', {
								hour: "2-digit",
								minute: "2-digit",
								day: "2-digit",
								month: "long",
								year: "numeric",
								hour12: true
							})}
						</span>
					</div>
				</div>

				<div className="break-words">
					{children ?? ""}
				</div>
			</div>
		</div>
	);
};

export default ChatMessage;
