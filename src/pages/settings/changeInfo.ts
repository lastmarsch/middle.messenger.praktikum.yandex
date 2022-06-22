import { Block } from '../../core';
import { IProps } from '../../core/Block';
import Input from '../../components/input';
import styles from './settings.module.css';
import * as user from '../../data/user.json';
import {
  avatarPath, backPath,
} from '../../const/images';
import VALIDATION_RULES from '../../utils/validationRules';

export default class ChangeInfoPage extends Block {
  constructor(props: IProps) {
    const onSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const data = Object.fromEntries(new FormData(form));

      console.log(data);

      (Object.values(this.children) as Input[]).forEach((child) => {
        if (!document.body.contains(child.element)
        || !child.props.validated
        || !(child.props.id in data)) { return; }

        // some logic here
        child.validateSelf();
      });
    };
    super({ ...props, events: { submit: onSubmit } });
  }

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
        <form id="settings" class="${styles['main-area__list']}">
          {{{ SettingsItem 
            id="first_name" 
            name="first_name" 
            title="First name" 
            type="text"
            value="${user.first_name}"
            regexp="${VALIDATION_RULES.first_name.regexp}" 
            rules="${VALIDATION_RULES.first_name.rules}" 
            validated=true
          }}}
          {{{ SettingsItem 
            id="second_name" 
            name="second_name" 
            title="Second name" 
            type="text"
            value="${user.second_name}"
            regexp="${VALIDATION_RULES.second_name.regexp}" 
            rules="${VALIDATION_RULES.second_name.rules}" 
            validated=true
          }}}
          {{{ SettingsItem 
            id="display_name" 
            name="display_name" 
            title="Display name" 
            type="text"
            value="${user.display_name}"
            regexp="${VALIDATION_RULES.first_name.regexp}" 
            rules="${VALIDATION_RULES.first_name.rules}" 
            validated=true
          }}}
          {{{ SettingsItem 
            id="login" 
            name="login" 
            title="Login" 
            type="text"
            value="${user.login}"
            regexp="${VALIDATION_RULES.login.regexp}" 
            rules="${VALIDATION_RULES.login.rules}" 
            validated=true
          }}}
          {{{ SettingsItem 
            id="email" 
            name="email" 
            title="Email" 
            type="text"
            value="${user.email}"
            regexp="${VALIDATION_RULES.email.regexp}" 
            rules="${VALIDATION_RULES.email.rules}" 
            validated=true
          }}}
          {{{ SettingsItem 
            id="phone" 
            name="phone" 
            title="Phone" 
            type="tel"
            value="${user.phone}"
            regexp="${VALIDATION_RULES.phone.regexp}" 
            rules="${VALIDATION_RULES.phone.rules}" 
            validated=true
          }}}
        </form>
        {{{ Button id="settings" form="settings" class="${styles['main-area__submit']}" type="submit" innerText="Save changes"}}}
      </div>
    </div>    
    `;
  }
}
