import authAPI from '@api/auth';
import { SignUpRequestData, SignInRequestData } from '@api/types';

const authService = {
  signIn: (data: SignInRequestData) => authAPI.signin(data)
    .then((r) => new Promise((resolve, reject) => {
      if (r.status === 200) {
        resolve(r.response);
      } else {
        reject(new Error(`[signIn] ${r.response}`));
      }
    })),

  signUp: (data: SignUpRequestData) => authAPI.signup(data)
    .then((r) => new Promise((resolve, reject) => {
      if (r.status === 200) {
        resolve(r.response);
      } else {
        reject(new Error(`[signUp] ${r.response}`));
      }
    })),

  getCurrentUser: () : Promise<User> => authAPI.me()
    .then((r) => new Promise((resolve, reject) => {
      if (r.status === 200) {
        const user = JSON.parse(r.response);
        resolve(user);
      } else {
        reject(new Error(`[getCurrentUser] ${r.response}`));
      }
    })),

  logout: () => authAPI.logout()
    .then((r) => new Promise((resolve, reject) => {
      if (r.status === 200) {
        resolve(r.response);
      } else {
        reject(new Error(`[logout] ${r.response}`));
      }
    })),
};

export default authService;
