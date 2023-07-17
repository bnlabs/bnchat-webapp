import { Embed } from "./Embed";

export type Message = {
  senderId: string;
  receiverId: string;
  content: string;
  senderName: string;
  conversationId: string;
  timestamp: string;
  id: string;
  embeds: Embed[];
};
