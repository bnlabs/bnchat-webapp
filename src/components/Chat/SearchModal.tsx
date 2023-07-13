import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Avatar } from "@mantine/core";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { addConversation } from "../../redux/conversationSlice";
import useConversationSelector from "../../hooks/useConversationSelector";
import { useDispatch } from "react-redux";
import useUserSelector from "../../hooks/useUserSelector";
import { addUserToMap } from "../../redux/userMapSlice";
import { Conversation } from "../../Types";

type user = {
  id: string;
  pictureUrl: string;
  username: string;
};

const apiUrl = import.meta.env.VITE_API_URL;

const SearchModal = ({
  setConversationFunc,
}: {
  setConversationFunc: (id: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<user[]>([]);
  const convo = useConversationSelector();
  const user = useUserSelector();
  const Dispatch = useDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    axios
      .get(`${apiUrl}/User/SearchUsername?searchInput=${searchTerm}`, {
        withCredentials: true,
      })
      .then((response: AxiosResponse<user[]>) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };

  const startConversation = (result: user) => {
    const conversationIdList = convo.conversations.filter((c) =>
      c.memberIds.includes(result.id)
    );
    const convoExist = conversationIdList.length > 0;

    if (convoExist) {
      setConversationFunc(conversationIdList[0].conversationId);
      return;
    }

    const otherUserId = result.id;
    const newConversation: Conversation = {
      conversationId: "",
      memberIds: [result.id, user.id || ""],
      messages: [],
      memberMap: {
        [otherUserId]: result.username,
        [user.id || ""]: user.username,
      },
    };

    Dispatch(addUserToMap(result));
    Dispatch(addConversation(newConversation));
    return;
  };

  return (
    <div className="text-center p-3">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
      ></input>
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((result) => (
          <li
            key={result.id}
            className="text-slate-300 flex flex-row justify-between"
          >
            <Avatar size={"lg"} src={result.pictureUrl} />
            <div className="text-lg">{result.username}</div>
            <button className="m-2" onClick={() => startConversation(result)}>
              <ChatBubbleIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchModal;
