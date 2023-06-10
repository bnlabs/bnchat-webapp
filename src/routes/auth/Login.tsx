import { Button, PasswordInput, TextInput } from "@mantine/core";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../redux/userSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Login() {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	function handleLogin(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);

		axios
			.post(
				"http://localhost:5077/auth/login",
				{
					email: event.currentTarget.email.value,
					password: event.currentTarget.password.value,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => {
				dispatch(actions.setUsername(response?.data.username));
				setIsLoading(false);
				navigate("/app");
			})
			.catch((error: Error) => {
				toast.error(error.message, {
					style: {
						background: "#333",
						color: "#fff",
					},
				});

				setIsLoading(false);
			});
	}

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="p-8 text-left bg-gray-800 rounded shadow-lg">
				<p className="mt-0 text-2xl font-bold text-center">
					Login to your account
				</p>
				<form action="submit" onSubmit={handleLogin}>
					<div className="mt-4">
						<div>
							<TextInput name="email" type="email" placeholder="Email" />
						</div>
						<div className="mt-4">
							<PasswordInput
								name="password"
								type="password"
								placeholder="Password"
							/>
						</div>
						<div className="flex mt-4 justify-end">
							<Button type="submit" className="mr-2" loading={isLoading}>
								Login
							</Button>
							<Link to="/auth/signup">
								<Button variant="outline" disabled={isLoading}>
									Signup
								</Button>
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
