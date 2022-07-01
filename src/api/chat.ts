import { fetch, METHODS } from '../utils';
import {
  GetChatsRequestData,
  CreateChatRequestData,
  ChatIdData,
  AddUsersToChatRequestData,
  DeleteUsersFromChatRequestData,
} from './types';

const chatAPI = {
  getChats: (data: GetChatsRequestData) => fetch('chats', {
    data,
    method: METHODS.GET,
  }),

  createChat: (data: CreateChatRequestData) => fetch('chats', {
    data,
    method: METHODS.POST,
  }),

  deleteChat: (data: ChatIdData) => fetch('chats', {
    data,
    method: METHODS.DELETE,
  }),

  addUsersToChat: (data: AddUsersToChatRequestData) => fetch('chats/users', {
    data,
    method: METHODS.PUT,
  }),

  getChatToken: (data: ChatIdData) => fetch(`chats/token/${data.chatId}`, {
    method: METHODS.POST,
  }),

  deleteUsersFromChat: (data: DeleteUsersFromChatRequestData) => fetch('chats/users', {
    data,
    method: METHODS.DELETE,
  }),
};

export default chatAPI;
