import { Block } from '../core';
import { SignInPage, SignUpPage } from '../pages/auth';
import ChatPage from '../pages/chat';
import { Page404, Page500 } from '../pages/error';
import HomePage from '../pages/home';
import { ChangeInfoPage, ChangePasswordPage, ProfilePage } from '../pages/settings';

interface IRoutes {
  [route: string]: typeof Block
}

const routes: IRoutes = {
  '/signIn': SignInPage,
  '/signUp': SignUpPage,
  '/404': Page404,
  '/500': Page500,
  '/chat': ChatPage,
  '/': HomePage,
  '/changeInfo': ChangeInfoPage,
  '/changePassword': ChangePasswordPage,
  '/profile': ProfilePage,
};

export default routes;
