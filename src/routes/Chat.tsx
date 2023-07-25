import {
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ChatMessage from "../components/Chat/ChatMessage";
import ChatSender from "../components/Chat/ChatSender";
import SignalRContext from "../components/SignalR/SignalRContext";
import axios from "axios";
import useUserSelector from "../hooks/useUserSelector";
import useConversationSelector from "../hooks/useConversationSelector";
import { useDispatch } from "react-redux";
import { addConversation, addMessage } from "../redux/conversationSlice";
import ConversationContainer from "../components/Chat/ConversationContainer";
import NotificationSound from "../../assets/sounds/notification-sound.mp3";
import ControlPanel from "../components/Chat/ControlPanel";
import AddIcon from "@mui/icons-material/Add";
import WifiIcon from "@mui/icons-material/Wifi";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { setUserMap } from "../redux/userMapSlice";
import useUserMapSelector from "../hooks/useUserMapSelector";
import Settings from "../components/Chat/Settings";
import SearchModal from "../components/Chat/SearchModal";
import { Message } from "../types/Message";
import { Conversation } from "../types/Conversation";
import { Embed } from "../types/Embed";
import EmbedContainer from "../components/Chat/EmbedContainer";


const apiUrl = import.meta.env.VITE_API_URL;

const Chat = () => {
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Closed ❌ ");
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [settingContainer, setSettingContainer] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const convo = useConversationSelector();
  const [conversationId, setConversationId] = useState<string>();
  const messageWindow = useRef<HTMLUListElement | null>(null);
  const Dispatch = useDispatch();
  const user = useUserSelector();
  const userMap = useUserMapSelector();

  const updateMessageHistory = useCallback(
    (message: Message) => {
      setMessageHistory((prevMessageHistory) => [
        ...prevMessageHistory,
        message,
      ]);
    },
    [setMessageHistory]
  );

  const connection = useContext(SignalRContext);

  useEffect(() => {
    connection
      ?.start()
      .then(() => {
        console.log("Connected!");
        connection.on("ReceiveMessage", onMessage);
        setConnectionStatus("Open ✅");
      })
      .catch((e) => console.log("Connection failed: ", e));

    const onMessage = (value: any) => {
      console.log(value);
      if (value.senderId === user.id) {
        setConversationId(value.conversationId);
      }
      const audio = new Audio(NotificationSound);
      audio.play();
      Dispatch(addMessage(value));
      updateMessageHistory(value);
    };
  }, [updateMessageHistory, connection]);

  useEffect(() => {
    messageWindow.current?.scrollTo(0, messageWindow.current.scrollHeight);
  }, [messageHistory]);

  useEffect(() => {
    var guidList: string[] = [];
    axios
      .get(`${apiUrl}/Message/getConversation`, {
        withCredentials: true,
      })
      .then((response: { data: Conversation[] }) => {
        response.data.forEach(function (value: Conversation) {
          value?.messages.forEach((msg) => {
            msg.senderName = value.memberMap[msg.senderId];
          });
          value.memberIds.forEach((id) => {
            guidList.push(id);
          });
          Dispatch(addConversation(value));
        });
        axios
          .post(`${apiUrl}/User/getUsers`, guidList, { withCredentials: true })
          .then((response: { data: any }) => {
            Dispatch(setUserMap(response.data));
          });
      });
  }, []);

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = {
      senderId: user.id,
      receiverId: convo.conversations
        .filter((c) => c.conversationId === conversationId)[0]
        .memberIds.filter((memberId) => memberId !== user.id)[0],
      senderName: user.username,
      content: event.currentTarget.message.value,
      conversationId,
    };

    connection?.invoke("SendMessage", command);
    if (event.currentTarget.message.value === "") return;
  };

  const toggleSetting = () => {
    setSettingContainer(!settingContainer);
  };

  const compareFunction = (
    conversationA: Conversation,
    conversationB: Conversation
  ) => {
    const lastMessageA = conversationA.messages[0];
    const lastMessageB = conversationB.messages[0];
    const A = new Date(lastMessageA?.timestamp || "");
    const B = new Date(lastMessageB?.timestamp || "");

    return +A - +B;
  };

  const getImageUrls = (content:string) => {
    // Regular expression pattern to match image URLs
    const imageUrlPattern = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/gi;
  
    // Extract all image URLs from the content
    const imageUrls = content.match(imageUrlPattern) || null;
  
    return imageUrls;
  }
  
  

  return (
    <>
      <>
        <div className="w-96 bg-slate-950 rounded-xl mr-2 max-lg:hidden flex flex-col justify-between">
          <div>
            <button onClick={open}>
              <AddIcon />
            </button>
            <ul className="list-none m-0 p-0">
              {[...convo.conversations]
                .sort(compareFunction)
                .reverse()
                .map((c) => {
                  let recipientName = "";
                  let avatarUrl = "";
                  const isActive = c.conversationId === conversationId;
                  const selectedClassname = isActive ? " bg-slate-700" : "";
                  const conversation = convo.conversations.filter(
                    (e) => e.conversationId === c.conversationId
                  )[0];
                  let latestMessage = conversation?.messages[0];
                  for (const id in conversation.memberMap) {
                    if (id === user.id) {
                      continue;
                    }
                    const value = conversation.memberMap[id];
                    avatarUrl =
                      userMap.userMap.filter(
                        (u: { id: string }) => u.id == id
                      )[0]?.pictureUrl || "";

                    recipientName = value;
                    break;
                  }

                  return (
                    <li key={conversation.conversationId}>
                      <div
                        className={
                          "border-gray-700 border-b-0 border-t border-x-0 border-solid hover:text-slate-500" +
                          selectedClassname
                        }
                        onClick={() => {
                          connection?.invoke(
                            "JoinGroup",
                            conversation.conversationId
                          );
                          setConversationId(conversation.conversationId);
                        }}
                      >
                        <ConversationContainer
                          recipientName={recipientName}
                          latestMessage={latestMessage}
                          avatarUrl={avatarUrl}
                        />
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <ControlPanel toggleSetting={toggleSetting} />
        </div>
        <div className="flex flex-1 flex-col p-4 bg-slate-950 rounded-xl">
          <div className="mb-4">
            <label className="mb-2 flex items-center">
              {" "}
              <WifiIcon className="mr-2" />
              {connectionStatus}
            </label>
            <div>
              <label className="mr-2">Conversation: {conversationId}</label>
            </div>
          </div>
          <div className="flex flex-1 overflow-hidden w-full rounded bg-slate-800">
            <ul
              ref={messageWindow}
              className="flex flex-col-reverse overflow-y-scroll no-scrollbar m-0 flex-1 p-2  list-none"
            >
              {convo.conversations
                .filter((c) => c.conversationId === conversationId)[0]
                ?.messages?.map((messageData: Message, index: any) => {
                  return (
                    <li className="my-1" key={index.toString()}>
                      <ChatMessage
                        username={messageData?.senderName || ""}
                        timestamp={messageData?.timestamp || ""}
                        avatarUrl={
                          userMap.userMap.filter(
                            (u) => u.id == messageData.senderId
                          )[0]?.pictureUrl || ""
                        }
                      >
                        {messageData.content}
                        <div className="">
                          {messageData.embeds?.map((embed:Embed, index:any) => {
                            return <>
                              <EmbedContainer urlPreview={embed}/>
                            </>
                          })}
                          {(getImageUrls(messageData.content))?.map(a => {
                            return <>
                              <img src={a} className="p-2"/>
                            </>
                          })}
                        </div>
                      </ChatMessage>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="flex w-full justify-center rounded mt-2 bg-slate-800 p-2">
            <ChatSender
              disabled={false}
              handleSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </>
      <div className="absolute">
        {<Settings isOpen={settingContainer} toggleFunc={toggleSetting} />}
        <Modal opened={opened} onClose={close} title="Start Conversation">
          <SearchModal setConversationFunc={setConversationId} />
        </Modal>
      </div>
    </>
  );
};

export default Chat;
