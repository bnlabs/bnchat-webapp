import { Avatar } from "@mantine/core";

function ChatMessage({
	message,
	username,
}: {
	message: string;
	username: string;
}) {
	return (
		<div className="bg-slate-900 p-2 rounded-xl">
			<div className="flex items-center">
				<Avatar size={"xs"} />
				<div className="text-xs">
					<strong>Pancho</strong>
				</div>
			</div>
			<div className="break-words">{message}</div>
		</div>
	);
}

export default ChatMessage;
