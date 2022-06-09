import {
  renderDOM, registerComponent,
} from 'core';

// components
import Button from 'components/button';
import Input from 'components/input';
import Link from 'components/link';
import ChatListItem from 'pages/chat/components/chatListItem';
import Message from 'pages/chat/components/message';
import SettingsItem from 'pages/settings/components/settingsItem';

import routes from './const/routes';

[Button, Input, Link, ChatListItem, Message, SettingsItem]
  .forEach((component) => {
    registerComponent(component);
  });

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(routes['/']);
});
