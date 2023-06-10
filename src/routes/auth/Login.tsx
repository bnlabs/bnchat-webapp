import { Button, Input } from "@mantine/core";
import { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../redux/userSlice";
import { RootState } from "../../redux/userStore";
import axios from 'axios';

function Login() {
	const dispatch = useDispatch();
	const username = useSelector((state: RootState) => state.user.username);

	function handleLogin(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const payload = JSON.stringify({
				"email": event.currentTarget.username.value,
				"password": event.currentTarget.password.value
			});

			const config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'http://localhost:5077/auth/login',
			headers: { 
				'Content-Type': 'application/json'
			},
			data : payload
			};

			axios.request(config)
				.then((response:any) => {
					console.log(JSON.stringify(response.data));
					dispatch(actions.setUsername(response?.data.username));
				})
				.catch((error:any) => {
					console.log(error);
				});
	}

	return (
		<div>
			<form
				action="submit"
				className="flex justify-center"
				onSubmit={handleLogin}
			>
				<Input className="mr-2" placeholder="Username" name="username"></Input>
				<Input className="mr-2" placeholder="Password" name="password"></Input>
				<Button type="submit">Set username</Button>
			</form>
			<div>Username: {username}</div>
		</div>
	);
}

export default Login;
