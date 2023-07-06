import { useSelector } from "react-redux";
import { RootState } from "../redux/userStore";

const useConversationSelector = () => {
  const convo = useSelector((state: RootState) => state.conversation);
  return convo;
};

export default useConversationSelector;
