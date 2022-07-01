import { Block, IProps } from '../../core';
import styles from './settings.module.css';
import { backPath } from '../../const/images';
import { ValidatedInput } from '../../components';
import { VALIDATION_RULES, withRouter } from '../../utils';
import { authService, userService } from '../../services';

class ChangePasswordPage extends Block<IProps> {
  constructor(props: IProps) {
    const onSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const data = Object.fromEntries(new FormData(form));

      let isValid = true;
      (Object.values(this.children) as ValidatedInput[]).forEach((child) => {
        if (!document.body.contains(child.element)
        || !(child.validateSelf)
        || !(child.props.id! in data)) { return; }

        const childValidity = child.validateSelf();
        isValid = isValid && childValidity;
      });

      console.log(data);

      if (isValid) {
        const passwordsMatch = data.new_password === data.confirm_password;
        if (!passwordsMatch) {
          // show error
          return;
        }

        const transformedData = {
          oldPassword: data.old_password as string,
          newPassword: data.new_password as string,
        };

        userService.password(transformedData)
          .then((r) => this.props.router.go('/settings'))
          .catch((e) => console.log(`%c ${e}`, 'background: #c6282850;'));
      }
    };

    super({
      ...props,
      user: {
        id: 0,
        first_name: '',
        second_name: '',
        display_name: '',
        login: '',
        email: '',
        phone: '',
        avatar: '',
      },
      events: {
        submit: onSubmit,
      },
      goToMessenger: () => this.props.router.go('/messenger'),
    });
  }

  componentDidMount() {
    authService.getCurrentUser()
      .then((user) => {
        this.setProps({ user });
      })
      .catch((e) => this.props.router.go('/'));
  }

  show(): void {
    authService.getCurrentUser()
      .then((user) => {
        this.setProps({ user });
      })
      .catch((e) => this.props.router.go('/'));

    super.show();
  }

  protected render() {
    return `
    <div class="${styles['app-container']}">
      {{{ Link 
        href="/messenger" 
        class="${styles['side-button']}" 
        img="${backPath}" 
        onClick=goToMessenger
      }}}
      <div class="${styles['main-area']}">
        <div class="${styles['main-area__header']}">
          {{{ Avatar
            id="avatar"
            name="avatar"
            avatar=user.avatar
            edit=true
            onClick=changeAvatar
          }}}
          <span class="${styles['main-area__username']}">{{ user.display_name }}</span>
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

export default withRouter(ChangePasswordPage);
