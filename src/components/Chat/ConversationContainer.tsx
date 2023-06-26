import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'


const ConversationContainer = ({recipientName, latestMessage} : {recipientName:string,latestMessage:any }) => {
    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US');
    return <div className="p-3">
        <div className="p-1 font-extrabold">
            {recipientName}
        </div>
        {latestMessage.senderName}: {latestMessage.content}
        <div className='text-xs text-gray-500'>
            {timeAgo.format(new Date(latestMessage.timestamp))}
        </div>
    </div>
}

export default ConversationContainer;