import { Block } from 'core';
import styles from './settings.module.css';
import * as user from '../../data/user.json';
import {
  avatarPath, backPath,
} from '../../const/images';
import { IProps } from '../../core/Block';
import validationRules from '../../utils/validationRules';

export default class ChangePasswordPage extends Block {
  constructor(props: IProps) {
    const onSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const data = Object.fromEntries(new FormData(form));

      console.log(data);

      Object.values(this.children).forEach((child) => {
        if (!document.body.contains(child.element)
        || !child.validateSelf
        || !(child._props.id in data)) { return; }

        // some logic here
        console.log(`${child._props.id}: ${child.validateSelf()}`);
      });
    };
    super({ ...props, events: { submit: onSubmit } });
  }

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
          {{{ SettingsItem 
            id="old_password" 
            name="old_password" 
            title="Old password" 
            type="password"
            regexp="${validationRules.password.regexp}" 
            rules="${validationRules.password.rules}" 
          }}}
          {{{ SettingsItem 
            id="new_password" 
            name="new_password" 
            title="New password" 
            type="password"
            regexp="${validationRules.password.regexp}" 
            rules="${validationRules.password.rules}" 
          }}}
          {{{ SettingsItem 
            id="confirm_password" 
            name="confirm_password" 
            title="Confirm password" 
            type="password"
            regexp="${validationRules.password.regexp}" 
            rules="${validationRules.password.rules}" 
          }}}
        </form>
        {{{ Button id="settings" form="settings" class="${styles['main-area__submit']}" type="submit" innerText="Save changes"}}}
      </div>
    </div>    
    `;
  }
}
