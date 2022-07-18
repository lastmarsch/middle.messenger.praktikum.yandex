import userAPI from '@api/user';
import {
  UserProfileRequestData,
  PasswordRequestData,
} from '@api/types';

const userService = {
  profile: (data: UserProfileRequestData) => userAPI.profile(data)
    .then((r) => new Promise((resolve, reject) => {
      if (r.status === 200) {
        resolve(JSON.parse(r.response));
      } else {
        reject(new Error(`[profile] ${r.response}`));
      }
    })),

  avatar: (data: FormData) => userAPI.avatar(data)
    .then((r) => new Promise((resolve, reject) => {
      if (r.status === 200) {
        resolve(r.response);
      } else {
        reject(new Error(`[avatar] ${r.response}`));
      }
    })),

  password: (data: PasswordRequestData) => userAPI.password(data)
    .then((r) => new Promise((resolve, reject) => {
      if (r.status === 200) {
        resolve(r.response);
      } else {
        reject(new Error(`[password] ${r.response}`));
      }
    })),
};

export default userService;
