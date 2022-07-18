import chatAPI from '@api/chat';
import {
  CreateChatRequestData,
  AddUsersToChatRequestData,
  DeleteUsersFromChatRequestData,
  ChatIdData,
} from '@api/types';

const chatService = {
  ws: null,

  createChat: (data: CreateChatRequestData) => chatAPI.createChat(data)
    .then((r) => new Promise((resolve, reject) => {
      if (r.status === 200) {
        resolve(JSON.parse(r.response));
      } else {
        reject(new Error(`[createChat] ${r.response}`));
      }
    })),

  createChatWithUser: (
    { title, user } : { title: string, user: number },
    currentUserId: number,
  ) => {
    if (+user === currentUserId) {
      return Promise.reject(new Error('[createChatWithUser] Cannot create a chat with themselves'));
    }
    return chatService.createChat({ title })
      .then((r) => new Promise((resolve, reject) => {
        chatService.addUsersToChat({
          users: [user],
          chatId: (r as any).id,
        })
          // eslint-disable-next-line @typescript-eslint/no-shadow
          .then((r) => resolve(r))
          .catch((e) => reject(new Error(`[createChatWithUser.addUsersToChat] ${e}`)));
      }))
      .catch((e) => Promise.reject(new Error(`[createChatWithUser.createChat] ${e}`)));
  },

  addUsersToChat: (data: AddUsersToChatRequestData) => chatAPI.addUsersToChat(data)
    .then((r) => new Promise((resolve, reject) => {
      if (r.status === 200) {
        resolve(r.response);
      } else {
        reject(new Error(`[addUsersToChat] ${r.response}`));
      }
    })),

  getChats: () => chatAPI.getChats({})
    .then((r) => new Promise((resolve, reject) => {
      if (r.status === 200) {
        resolve(JSON.parse(r.response));
      } else {
        reject(new Error(`[getChats] ${r.response}`));
      }
    })),

  leaveChat: (data: DeleteUsersFromChatRequestData) => chatAPI.deleteUsersFromChat(data)
    .then((r) => new Promise((resolve, reject) => {
      if (r.status === 200) {
        resolve(r.response);
      } else {
        reject(new Error(`[leaveChat] ${r.response}`));
      }
    })),

  deleteChat: (data: ChatIdData) => chatAPI.deleteChat(data)
    .then((r) => new Promise((resolve, reject) => {
      if (r.status === 200) {
        resolve(r.response);
      } else {
        reject(new Error(`[deleteChat] ${r.response}`));
      }
    })),

  // WS

  getChatToken: (data: ChatIdData) => chatAPI.getChatToken(data)
    .then((r) => new Promise((resolve, reject) => {
      if (r.status === 200) {
        resolve(JSON.parse(r.response).token);
      } else {
        reject(new Error(`[getChats] ${r.response}`));
      }
    })),

  connectToWS: (
    data: ChatIdData,
    currentUserId: number | string,
    callback: (...args: any[]) => void,
  ) => chatService.getChatToken(data)
    .then((token) => new Promise((resolve) => {
      const { chatId } = data;

      if (chatService.ws) { (chatService.ws! as WebSocket).close(); }

      (chatService.ws! as WebSocket) = new WebSocket(
        `wss://ya-praktikum.tech/ws/chats/${currentUserId}/${chatId}/${token}`,
      );

      (chatService.ws! as WebSocket).addEventListener('open', () => {
        console.log('Соединение установлено');

        (chatService.ws! as WebSocket).send(
          JSON.stringify({
            content: '0',
            type: 'get old',
          }),
        );

        (chatService.ws! as WebSocket).addEventListener('message', (event) => {
          console.log('Получены данные', event, event.data);

          let messages = JSON.parse(event.data);
          if (messages && !Array.isArray(messages)) messages = [messages];
          callback(messages.reverse());
        });
      });

      (chatService.ws! as WebSocket).addEventListener('close', (event) => {
        if (event.wasClean) {
          console.log('Соединение закрыто чисто');
        } else {
          console.log('Обрыв соединения');
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      });

      (chatService.ws! as WebSocket).addEventListener('error', (event) => {
        console.log('Ошибка', (event as any).message);
      });

      resolve(true);
    }))
    .catch((e) => Promise.reject(new Error(`[connectToWS] ${e}`))),

  sendMessage({ message }: { message: string }) {
    if (chatService.ws) {
      (chatService.ws! as WebSocket).send(
        JSON.stringify({
          content: message,
          type: 'message',
        }),
      );
      (chatService.ws! as WebSocket).send(
        JSON.stringify({
          content: '0',
          type: 'get old',
        }),
      );
    }
  },
};

export default chatService;
