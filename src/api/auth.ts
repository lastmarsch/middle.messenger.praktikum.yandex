import { fetch, METHODS } from '@utils';
import { SignUpRequestData, SignInRequestData } from '@api/types';

const authAPI = {
  signup: (data: SignUpRequestData) => fetch('auth/signup', {
    data,
    method: METHODS.POST,
  }),

  signin: (data: SignInRequestData) => fetch('auth/signin', {
    data,
    method: METHODS.POST,
  }),

  me: () => fetch('auth/user', {
    method: METHODS.GET,
  }),

  logout: () => fetch('auth/logout', {
    method: METHODS.POST,
  }),
};

export default authAPI;
