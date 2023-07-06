import { useSelector } from "react-redux";
import { RootState } from "../redux/userStore";

const useUserMapSelector = () => {
  return useSelector((state: RootState) => state.userMap);
};

export default useUserMapSelector;
