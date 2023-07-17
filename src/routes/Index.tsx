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
			<Link to="/auth/signup">
				<Button>
					Signup
				</Button>
			</Link>
		</div>
	);
};

export default Index;
