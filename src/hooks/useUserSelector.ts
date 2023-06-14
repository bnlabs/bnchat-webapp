import { useSelector } from "react-redux";
import { RootState } from "../redux/userStore";

const useUserSelector = () => {
	const user = useSelector((state: RootState) => state.user);
	return user;
};

export default useUserSelector;
