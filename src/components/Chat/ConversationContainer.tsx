


const ConversationContainer = ({recipientName, latestMessage} : {recipientName:string,latestMessage:any }) => {

    return <div className="p-3">
        <div className="p-1 font-extrabold">
            {recipientName}
        </div>
        {latestMessage.senderName}: {latestMessage.content}
    </div>
}

export default ConversationContainer;