import { Button, PasswordInput, TextInput } from "@mantine/core";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { ApiClient } from "../../utils/api";

const Login = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleLogin = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);

		toast.promise(
			ApiClient.post("/auth/login", {
				email: event.currentTarget.email.value,
				password: event.currentTarget.password.value,
			}),
			{
				loading: "Loading...",
				success: (response) => {
					const { username, id } = response.data;
					dispatch(setUser({ username, id }));
					setIsLoading(false);
					navigate("/app");

					return "Logged in successfully!";
				},
				error: (error) => {
					setIsLoading(false);
					return error.message;
				},
			},
			{
				style: {
					background: "#333",
					color: "#fff",
				},
			}
		);
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="p-8 text-left bg-gray-800 rounded shadow-xl">
				<p className="mt-0 text-2xl font-bold text-center">
					Login to your account
				</p>
				<form action="submit" onSubmit={handleLogin}>
					<div className="mt-4">
						<div>
							<TextInput name="email" type="email" placeholder="Email" />
						</div>
						<div className="mt-4">
							<PasswordInput name="password" placeholder="Password" />
						</div>
						<div className="flex mt-4 justify-center gap-2">
							<Button
								variant="outline"
								disabled={isLoading}
								onClick={() => navigate("/auth/signup")}
							>
								Signup
							</Button>
							<Button type="submit" disabled={isLoading}>
								Login
							</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;

