import { Block, IProps } from '../../core';
import styles from './settings.module.css';
import { backPath } from '../../const/images';
import {
  logError, VALIDATION_RULES, withRouter, withValidation,
} from '../../utils';
import { authService, userService } from '../../services';

class ChangePasswordPage extends Block<IProps> {
  constructor(props: IProps) {
    const onSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;

      this.props.validate(form)
        .then((data: { new_password: string; confirm_password: any; old_password: string; }) => {
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
            .then(() => this.props.router.go('/settings'))
            .catch(logError);
        })
        .catch(logError);
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
      .catch(() => this.props.router.go('/'));
  }

  show(): void {
    authService.getCurrentUser()
      .then((user) => {
        this.setProps({ user });
      })
      .catch(() => this.props.router.go('/'));

    super.show();
  }

  protected render() {
    return `
    <div class="${styles.appContainer}">
      {{{ Link 
        href="/messenger" 
        class="${styles.sideButton}" 
        img="${backPath}" 
        onClick=goToMessenger
      }}}
      <div class="${styles.mainArea}">
        <div class="${(styles as any).mainArea__header}">
          {{{ Avatar
            id="avatar"
            name="avatar"
            avatar=user.avatar
            edit=true
            onClick=changeAvatar
          }}}
          <span class="${(styles as any).mainArea__username}">{{ user.display_name }}</span>
        </div>
        <form id="changePassword" class="${(styles as any).mainArea__list}">
          {{{ SettingsItem 
            id="old_password" 
            name="old_password" 
            title="Old password" 
            type="password"
            regexp="${VALIDATION_RULES.password.regexp}" 
            rules="${VALIDATION_RULES.password.rules}" 

            onFocus=validateInput
            onBlur=validateInput
          }}}
          {{{ SettingsItem 
            id="new_password" 
            name="new_password" 
            title="New password" 
            type="password"
            regexp="${VALIDATION_RULES.password.regexp}" 
            rules="${VALIDATION_RULES.password.rules}" 

            onFocus=validateInput
            onBlur=validateInput
          }}}
          {{{ SettingsItem 
            id="confirm_password" 
            name="confirm_password" 
            title="Confirm password" 
            type="password"
            regexp="${VALIDATION_RULES.password.regexp}" 
            rules="${VALIDATION_RULES.password.rules}" 

            onFocus=validateInput
            onBlur=validateInput
          }}}
        </form>
        {{{ Button 
          form="changePassword" 
          class="${(styles as any).mainArea__submit}" 
          type="submit" 
          innerText="Save changes"
        }}}
      </div>
    </div>    
    `;
  }
}

export default withRouter(withValidation(ChangePasswordPage as any) as any);
