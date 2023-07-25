import { Button, PasswordInput, TextInput } from "@mantine/core";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { setUser } from "../../redux/userSlice";


type SignupForm = {
	email: string;
	username : string;
	password: string;
  };


const url = import.meta.env.VITE_API_URL;

const Signup = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const handleSignup = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		
		toast.promise(
			signUpUser({
			  email: event.currentTarget.email.value,
			  username:event.currentTarget.username.value,
			  password: event.currentTarget.password.value,
			}),
			{
			  loading: "Loading...",
			  success: (response) => {
				const { username, id, pictureUrl } = response.data;
				dispatch(setUser({ username, id, avatar: pictureUrl }));
				setIsLoading(false);
				navigate("/auth/login");
	  
				return "Account Created!";
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

	const signUpUser = async (credentials: SignupForm) => {
		return await axios.post(`${url}/auth/signup`, credentials, {
		  withCredentials: true,
		});

	  };

	return (
	<div className="flex items-center justify-center min-h-screen">
		<div className="p-8 text-left bg-gray-800 rounded shadow-xl">
			<p className="mt-0 text-2xl font-bold text-center">
			Create an account
			</p>
			<form action="submit" onSubmit={handleSignup}>
			<div className="mt-4">
				<div>
				<TextInput name="username" type="username" placeholder="username" />
				</div>
				<div>
				<TextInput name="email" type="email" placeholder="Email" className="mt-4"/>
				</div>
				<div className="mt-4">
				<PasswordInput name="password" placeholder="Password" />
				</div>
				<div className="flex mt-4 justify-center gap-2">
				<Button
					variant="outline"
					disabled={isLoading}
					type="submit"
				>
					Signup
				</Button>
				<Button disabled={isLoading} onClick={() => navigate("/auth/login")}>
					Login
				</Button>
				</div>
			</div>
			</form>
		</div>
		</div>
	)
}

export default Signup;
