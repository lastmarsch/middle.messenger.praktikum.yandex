import { Block, renderDOM } from '../../core';
import { IProps } from '../../core/Block';
import styles from './settings.module.css';
import * as user from '../../data/user.json';
import {
  avatarPath, backPath,
} from '../../const/images';
import routes from '../../const/routes';

export default class ProfilePage extends Block<IProps> {
  constructor(props: IProps) {
    const onClick = (props: IProps) => {
      if (props.href in routes) { renderDOM(routes[props.href]); }
    };

    super({
      ...props,
      onClick,
    });
  }

  protected render() {
    return `
    <div class="${styles['app-container']}">
      {{{ Link 
        href="/chat" 
        class="${styles['side-button']}" 
        img="${backPath}" 
        onClick=onClick
      }}}
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
          {{{ Link 
            href="/changeInfo" 
            text="Change profile data"
            onClick=onClick 
          }}}
          {{{ Link 
            href="/changePassword" 
            text="Change password"
            onClick=onClick 
          }}}
          {{{ Link 
            href="/signIn" 
            text="Log out"
            onClick=onClick 
          }}}
        </div>  
      </div>
    </div>    
    `;
  }
}
