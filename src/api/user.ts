import { fetch, METHODS } from '../utils';
import {
  UserProfileRequestData,
  PasswordRequestData,
  UserSearchRequestData,
} from './types';

const userAPI = {
  profile: (data: UserProfileRequestData) => fetch('user/profile', {
    data,
    method: METHODS.PUT,
  }),

  avatar: (data: FormData) => fetch('user/profile/avatar', {
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: METHODS.PUT,
  }),

  password: (data: PasswordRequestData) => fetch('user/password', {
    data,
    method: METHODS.PUT,
  }),

  user: (data: UserSearchRequestData) => fetch('/user/search', {
    data,
    method: METHODS.POST,
  }),
};

export default userAPI;
