export type Conversation = {
  conversationId: string;
  memberIds: string[];
  messages: Message[];
  memberMap: any;
};

export type Message = {
  senderId: string;
  receiverId: string;
  content: string;
  senderName: string;
  conversationId: string;
  timestamp: string;
  id: string;
};
