import { createSlice } from "@reduxjs/toolkit/";
import type { PayloadAction } from "@reduxjs/toolkit";

type ConversationState = {
    conversations: {
        [conversationId: string]: {
          id: string;
          memberIds: string[]
          messages: Message[];
        };
      };
    }

type Message = {
	senderId: string;
	content: string;
	senderName: string;
	conversationId: string;
	timestamp: string;
	id: string;
}

const initialState: ConversationState = {
    conversations: {}
};

const conversationSlice = createSlice({
	name: "conversation",
	initialState,
	reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            const message: Message = action.payload;
            const { conversationId } = message;

            if (state.conversations.hasOwnProperty(conversationId)) {
                return {
                    ...state,   
                    conversations: {
                      ...state.conversations,
                      [conversationId]: { // the conversation with new message
                        ...state.conversations[conversationId],
                        messages: [ message, ...state.conversations[conversationId].messages],
                      },
                    },
                  };  
            }
        },
        addConversation:(state, action: PayloadAction<any>) => {
              const mappedPayload: {
                [conversationId: string]: {
                  id: string;
                  memberIds: string[];
                  messages: Message[];
                };
              } = {
                [action.payload.conversationId]: {
                  id: action.payload.conversationId,
                  memberIds: action.payload.memberIds,
                  messages: action.payload.messages
                }};

                return {
                  ...state,
                  conversations: {
                    ...state.conversations,
                    ...mappedPayload
                  }
                };
        }

	}
});

export const { addMessage, addConversation } = conversationSlice.actions;

export default conversationSlice;
