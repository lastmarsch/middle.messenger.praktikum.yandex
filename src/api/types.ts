export type SignUpRequestData = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
};

export type SignInRequestData = {
  login: string;
  password: string;
};

export type GetChatsRequestData = {
  offset?: number
  limit?: number
  title?: string
};

export type CreateChatRequestData = {
  title: string
};

export type ChatIdData = {
  chatId: number
};

export type AddUsersToChatRequestData = {
  users: number[],
  chatId: number
};

export type DeleteUsersFromChatRequestData = {
  users: number[],
  chatId: number
};

export type UserProfileRequestData = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
};

export type PasswordRequestData = {
  oldPassword: string,
  newPassword: string,
};

export type UserSearchRequestData = {
  login: string
};
