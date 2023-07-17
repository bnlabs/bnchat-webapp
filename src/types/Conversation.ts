import { Message } from "./Message";

export type Conversation = {
  conversationId: string;
  memberIds: string[];
  messages: Message[];
  memberMap: any;
};
