import { Block } from 'core';
import styles from './settings.module.css';
import * as user from '../../data/user.json';
import {
  avatarPath, backPath,
} from '../../const/images';

export default class ChangePasswordPage extends Block {
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
          {{{ SettingsItem name="old_password" title="Old password" type="password" value=""}}}
          {{{ SettingsItem name="new_password" title="New password" type="password" value=""}}}
          {{{ SettingsItem name="confirm_password" title="Confirm password" type="password" value=""}}}
        </form>
        {{{ Button id="settings" form="settings" class="${styles['main-area__submit']}" type="submit" innerText="Save changes"}}}
      </div>
    </div>    
    `;
  }
}
