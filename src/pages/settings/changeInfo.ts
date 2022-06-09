import { Block } from 'core';
import styles from './settings.module.css';
import * as user from '../../data/user.json';
import {
  avatarPath, backPath,
} from '../../const/images';

export default class ChangeInfoPage extends Block {
  render() {
    return `
    <div class="${styles['app-container']}">
      {{{ Link href="/chat" class="${styles['side-button']}" img="${backPath}" }}}
      <div class="${styles['main-area']}">
        <div class="${styles['main-area__header']}">
          <label for="uploadAvatar" class="${styles['main-area__icon']}">
            <img src="${avatarPath}">
            <input type="file" name="uploadAvatar" id="uploadAvatar" hidden="true">
          </label>
          <span class="${styles['main-area__username']}">${user.display_name}</span>
        </div>
        <form id="settings" class="${styles['main-area__list']}">
          {{{ SettingsItem name="first_name" title="First name" value="${user.first_name}"}}}
          {{{ SettingsItem name="second_name" title="Second name" value="${user.second_name}"}}}
          {{{ SettingsItem name="display_name" title="Display name" value="${user.display_name}"}}}
          {{{ SettingsItem name="login" title="Login" value="${user.login}"}}}
          {{{ SettingsItem name="email" title="Email" value="${user.email}"}}}
          {{{ SettingsItem name="phone" title="Phone" value="${user.phone}"}}}
        </form>
        {{{ Button id="settings" form="settings" class="${styles['main-area__submit']}" type="submit" innerText="Save changes"}}}
      </div>
    </div>    
    `;
  }
}
