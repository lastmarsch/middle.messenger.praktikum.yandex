import { Block } from '../../core';
import styles from './settings.module.css';
import * as user from '../../data/user.json';
import {
  avatarPath, backPath,
} from '../../const/images';

export default class ProfilePage extends Block {
  protected render() {
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
        <div class="${styles['main-area__list']}">
          {{{ SettingsItem title="First name" value="${user.first_name}" readonly="true"}}}
          {{{ SettingsItem title="Second name" value="${user.second_name}" readonly="true"}}}
          {{{ SettingsItem title="Display name" value="${user.display_name}" readonly="true"}}}
          {{{ SettingsItem title="Login" value="${user.login}" readonly="true"}}}
          {{{ SettingsItem title="Email" value="${user.email}" readonly="true"}}}
          {{{ SettingsItem title="Phone" value="${user.phone}" readonly="true"}}}
        </div>
        <div class="${styles['main-area__links']}">
          {{{ Link href="/changeInfo" text="Change profile data" }}}
          {{{ Link href="/changePassword" text="Change password" }}}
          {{{ Link href="/signIn" text="Log out" }}}
        </div>  
      </div>
    </div>    
    `;
  }
}
