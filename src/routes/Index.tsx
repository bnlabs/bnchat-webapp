import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

const Index = () => {
	return (
		<div className="flex justify-center h-screen items-center gap-2">
			<Link to="/app">
				<Button>Chat</Button>
			</Link>
			<Link to="/auth/login">
				<Button>Login</Button>
			</Link>
			<Button
				onClick={() => {console.log("ah yes, a button")}}
			>
				Signup
			</Button>
		</div>
	);
};

export default Index;
