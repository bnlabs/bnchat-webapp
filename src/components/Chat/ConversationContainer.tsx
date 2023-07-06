import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { Avatar } from '@mantine/core'


const ConversationContainer = ({recipientName, latestMessage, avatarUrl} : {recipientName:string,latestMessage:any, avatarUrl:string }) => {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo('en-US');
    return <div className="p-3 flex">
        <Avatar size={"lg"} className="mr-3" src={avatarUrl}/>
        <div>
            <div className="p-1 font-extrabold">
                {recipientName}
            </div>
                {latestMessage ? (latestMessage?.senderName + ": " + latestMessage.content) : ""}
            <div className='text-xs text-gray-500'>
                {latestMessage ? timeAgo.format(new Date(latestMessage?.timestamp)) : ""}
            </div>
        </div>
    </div>
}

export default ConversationContainer;