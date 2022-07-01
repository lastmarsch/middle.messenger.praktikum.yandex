// components
import {
  Button, Input, Link, ValidatedInput, Avatar, Modal, ContextMenu,
} from './components';
import ChatListItem from './pages/chat/components/chatListItem';
import Message from './pages/chat/components/message';
import SettingsItem from './pages/settings/components/settingsItem';

import {
  Block, IProps, registerComponent, Router,
} from './core';
import { SignInPage, SignUpPage } from './pages/auth';
import { ChangeInfoPage, ChangePasswordPage, ProfilePage } from './pages/settings';
import ChatPage from './pages/chat';
import { Page404, Page500 } from './pages/error';

[Button,
  Input,
  ValidatedInput,
  Avatar,
  Link,
  Modal,
  ContextMenu,
  ChatListItem,
  Message,
  SettingsItem]
  .forEach((component) => {
    registerComponent(component);
  });

declare global {
  interface Window {
    router: Router;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router();
  window.router = router;
  router
    .use('/', SignInPage, {})
    .use('/sign-up', SignUpPage, {})
    .use('/settings', ProfilePage, {})
    .use('/settings-info', ChangeInfoPage, {})
    .use('/settings-password', ChangePasswordPage, {})
    .use('/messenger', ChatPage, {})
    .use('/500', Page500, {})
    .use('*', Page404, {})
    .start();
});
