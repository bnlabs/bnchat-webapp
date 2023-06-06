import { Button, Input } from "@mantine/core";
import { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../redux/userSlice";
import { RootState } from "../../redux/userStore";

function Login() {
	const dispatch = useDispatch();
	const username = useSelector((state: RootState) => state.user.username);

	function handleSetUsername(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		dispatch(actions.setUsername(event.currentTarget.username.value));
	}

	return (
		<>
			<form
				action="submit"
				className="flex justify-center"
				onSubmit={handleSetUsername}
			>
				<Input className="mr-2" placeholder="Username" name="username"></Input>
				<Button type="submit">Set username</Button>
			</form>
			<div>Username: {username}</div>
		</>
	);
}

export default Login;
