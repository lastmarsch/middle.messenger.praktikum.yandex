import { Block, renderDOM } from '../../core';
import { IProps } from '../../core/Block';
import styles from './settings.module.css';
import * as user from '../../data/user.json';
import {
  avatarPath, backPath,
} from '../../const/images';
import VALIDATION_RULES from '../../utils/validationRules';
import ValidatedInput from '../../components/validatedInput';
import routes from '../../const/routes';

export default class ChangePasswordPage extends Block<IProps> {
  constructor(props: IProps) {
    const onSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const data = Object.fromEntries(new FormData(form));

      console.log(data);

      (Object.values(this.children) as ValidatedInput[]).forEach((child) => {
        if (!document.body.contains(child.element)
        || !(child.validateSelf)
        || !(child.props.id! in data)) { return; }

        // some logic here
        child.validateSelf();
      });
    };

    const onClick = (props: IProps) => {
      if (props.href in routes) { renderDOM(routes[props.href]); }
    };

    super({
      ...props,
      onClick,
      events: {
        submit: onSubmit,
      },
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
        <form id="changePassword" class="${styles['main-area__list']}">
          {{{ SettingsItem 
            id="old_password" 
            name="old_password" 
            title="Old password" 
            type="password"
            regexp="${VALIDATION_RULES.password.regexp}" 
            rules="${VALIDATION_RULES.password.rules}" 
          }}}
          {{{ SettingsItem 
            id="new_password" 
            name="new_password" 
            title="New password" 
            type="password"
            regexp="${VALIDATION_RULES.password.regexp}" 
            rules="${VALIDATION_RULES.password.rules}" 
          }}}
          {{{ SettingsItem 
            id="confirm_password" 
            name="confirm_password" 
            title="Confirm password" 
            type="password"
            regexp="${VALIDATION_RULES.password.regexp}" 
            rules="${VALIDATION_RULES.password.rules}" 
          }}}
        </form>
        {{{ Button 
          form="changePassword" 
          class="${styles['main-area__submit']}" 
          type="submit" 
          innerText="Save changes"
        }}}
      </div>
    </div>    
    `;
  }
}
