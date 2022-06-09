import { SignInPage, SignUpPage } from 'pages/auth';
import { Page500, Page404 } from 'pages/error';
import ChatPage from 'pages/chat';
import HomePage from 'pages/home';
import { ChangeInfoPage, ChangePasswordPage, ProfilePage } from 'pages/settings';

const routes = {
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
