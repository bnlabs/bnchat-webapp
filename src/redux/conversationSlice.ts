import { createSlice } from "@reduxjs/toolkit/";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "../types/Conversation";
import { Message } from "../types/Message";


type ConversationState = {
  conversations: Conversation[];
};

const initialState: ConversationState = {
  conversations: [],
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      const message: Message = action.payload;

      // evaluate if conversation exist or if there is a conversation with the same user already
      const conversationExist =
        state.conversations.filter(
          (c) => c.conversationId === message.conversationId
        ).length > 0;
      const convoWithSameReceiver =
        state.conversations.filter(
          (c) =>
            c.memberIds.includes(message.receiverId) &&
            c.memberIds.includes(message.senderId)
        ).length > 0;

      // If the conversation doesn't exist, create a new one and add the message to it
      if (!conversationExist && !convoWithSameReceiver) {
        const newConversation = {
          conversationId: message.conversationId,
          memberIds: [message.senderId, message.receiverId],
          messages: [message],
          memberMap: {
            [message.senderId]: message.senderName,
            [message.receiverId]: "",
          },
        };

        return {
          ...state,
          conversations: [...state.conversations, newConversation],
        };
      } else if (convoWithSameReceiver && !conversationExist) {
        let updatedConversation: Conversation;
        const conversation = state.conversations.find(
          (c) =>
            c.memberIds.includes(message.receiverId) &&
            c.memberIds.includes(message.senderId)
        );

        if (conversation) {
          updatedConversation = {
            conversationId: message.conversationId,
            messages: [message],
            memberIds: conversation.memberIds,
            memberMap: conversation?.memberMap,
          };
        }

        const updatedConversations = state.conversations.map((conv) =>
          conv.memberIds.includes(message.receiverId) &&
          conv.memberIds.includes(message.senderId)
            ? updatedConversation
            : conv
        );

        return {
          ...state,
          conversations: updatedConversations,
        };
      }

      // If the conversation exists, update the messages array
      const conversation = state.conversations.find(
        (conv) => conv.conversationId === message.conversationId
      );

      let updatedConversation: Conversation;
      if (conversation) {
        updatedConversation = {
          ...conversation,
          messages: [message, ...conversation.messages],
        };
      }

      const updatedConversations = state.conversations.map((conv) =>
        conv.conversationId === message.conversationId
          ? updatedConversation
          : conv
      );

      return {
        ...state,
        conversations: updatedConversations,
      };
    },
    addConversation: (state, action: PayloadAction<Conversation>) => {
      const convo = action.payload;
      if (
        state.conversations.filter(
          (c) => c.conversationId === convo.conversationId
        ).length > 0
      ) {
        return;
      }
      return {
        ...state,
        conversations: [...state.conversations, convo],
      };
    },
  },
});

export const { addMessage, addConversation } = conversationSlice.actions;

export default conversationSlice;
