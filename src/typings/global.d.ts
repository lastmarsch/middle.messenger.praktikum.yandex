declare global {
  export type FetchResponse = {
    status: number,
    response: string
  };

  export type Chat = {
    id: number
    title: string
    avatar: string
    created_by: number
    unread_count: number
    last_message: {
      user: {
        first_name: string,
        second_name: string,
        avatar: string,
        email: string,
        login: string,
        phone: string,
      },
      time: string,
      content: string,
    }
  };

  export type User = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    phone: string;
    email: string;
  };

  export type Message = {
    chat_id: number
    content: string
    file: string
    id: number
    is_read: boolean
    time: string
    type: 'message'
    user_id: number
  };
}

export {};
