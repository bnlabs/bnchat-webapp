import { Button } from "@mantine/core";
import axios from "axios";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const Index = () => {
	return (
		<div className="flex justify-center h-screen items-center gap-2">
			<Link to="/chat">
				<Button>Chat</Button>
			</Link>
			<Link to="/auth/login">
				<Button>Login</Button>
			</Link>
			<Button
				onClick={() => {
					axios
						.get(
							`${apiUrl}/Message/getConversation?userId=2d0864cb-b289-4789-8bd6-8e451855a426`,
							{
								withCredentials: true,
							}
						)
						.then((response) => {
							console.log(response.data);
						})
						.catch((error) => {
							console.log(error);
						});
				}}
			>
				Test endpoint
			</Button>
		</div>
	);
};

export default Index;
