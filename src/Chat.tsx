import { useEffect, useState, useContext } from "react"
import * as signalR from '@microsoft/signalr'
import SignalRContext from "./SignalRContext";

interface Message {
    senderId: string;
    content: string;
    senderName: string;
    conversationId: string;
  }

const Chat = () => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    const handleInputChange = (event:any) => {
        setInputValue(event.target.value);
      };

      
    const connection = useContext(SignalRContext);
        
    useEffect(() => {

        connection.start()
        .then(() => {
            console.log("signalR connected")
        }).catch(e => {
            console.log(e);
        });

        connection.on("ReceiveMessage", (message:Message) => {
            // console.log(message);
            console.log(messages)
            setMessages(prevMessages => [...prevMessages, message]);
        })

    },[connection]);
    
    function sendMessage() {
        const object = {
            senderId: "310c993a-fa98-4929-a1ec-2af7bbae9ab0",
            content: inputValue,
            senderName: "Hyotic",
            conversationId: "d2a91240-8dd7-454a-9108-9c90af1b7381"
        }
        connection.invoke("SendMessage", object)
            .then(() => {
            console.log("message sent")})  
            .catch(e => {
            console.log("error trying to send message")
            console.log(e);
        });
    }


    return <>
        <p>
            {messages.map(msg => (
                <p>{msg.senderName}: {msg.content}</p>
            ))}
        </p>
        <input type="text" value={inputValue} onChange={handleInputChange} />
    <button onClick={sendMessage}>Send</button>
    </>
}

export default Chat;