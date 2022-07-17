import { Block, IProps } from '@core';
import styles from '@pages/settings/settings.module.css';
import { backPath } from '@const/images';
import { authService, userService } from '@services';
import {
  logError, VALIDATION_RULES, withRouter, withValidation,
} from '@utils';
import { UserProfileRequestData } from '@api/types';

class ChangeInfoPage extends Block<IProps> {
  constructor(props: IProps) {
    const onSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;

      this.props.validate(form)
        .then((data: UserProfileRequestData) => {
          userService.profile(data)
            .then(() => this.props.router.go('/settings'))
            .catch(logError);
        })
        .catch(logError);
    };

    const onChange = (e: Event) => {
      const input = e.target as HTMLInputElement;
      const file = input!.files![0];
      if (!file) return;
      const data = new FormData();
      data.append('avatar', file);
      userService.avatar(data)
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
      onChange,
      goToMessenger: () => this.props.router.go('/messenger'),
      events: {
        submit: onSubmit,
      },
    });
  }

  componentDidMount() {
    authService.getCurrentUser()
      .then((user) => this.setProps({ user }))
      .catch(() => this.props.router.go('/'));
  }

  show(): void {
    authService.getCurrentUser()
      .then((user) => this.setProps({ user }))
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
            onChange=onChange
          }}}
          <span class="${(styles as any).mainArea__username}">{{ user.display_name }}</span>
        </div>
        <form id="changeInfo" class="${(styles as any).mainArea__list}">
          {{{ SettingsItem 
            id="first_name" 
            name="first_name" 
            title="First name" 
            type="text"
            value=user.first_name
            regexp="${VALIDATION_RULES.first_name.regexp}" 
            rules="${VALIDATION_RULES.first_name.rules}" 

            onFocus=validateInput
            onBlur=validateInput
          }}}
          {{{ SettingsItem 
            id="second_name" 
            name="second_name" 
            title="Second name" 
            type="text"
            value=user.second_name
            regexp="${VALIDATION_RULES.second_name.regexp}" 
            rules="${VALIDATION_RULES.second_name.rules}" 

            onFocus=validateInput
            onBlur=validateInput
          }}}
          {{{ SettingsItem 
            id="display_name" 
            name="display_name" 
            title="Display name" 
            type="text"
            value=user.display_name
            regexp="${VALIDATION_RULES.first_name.regexp}" 
            rules="${VALIDATION_RULES.first_name.rules}"

            onFocus=validateInput
            onBlur=validateInput
          }}}
          {{{ SettingsItem 
            id="login" 
            name="login" 
            title="Login" 
            type="text"
            value=user.login
            regexp="${VALIDATION_RULES.login.regexp}" 
            rules="${VALIDATION_RULES.login.rules}" 

            onFocus=validateInput
            onBlur=validateInput
          }}}
          {{{ SettingsItem 
            id="email" 
            name="email" 
            title="Email" 
            type="text"
            value=user.email
            regexp="${VALIDATION_RULES.email.regexp}" 
            rules="${VALIDATION_RULES.email.rules}"

            onFocus=validateInput
            onBlur=validateInput
          }}}
          {{{ SettingsItem 
            id="phone" 
            name="phone" 
            title="Phone" 
            type="tel"
            value=user.phone
            regexp="${VALIDATION_RULES.phone.regexp}" 
            rules="${VALIDATION_RULES.phone.rules}" 

            onFocus=validateInput
            onBlur=validateInput
          }}}
        </form>
        {{{ Button 
          form="changeInfo" 
          class="${(styles as any).mainArea__submit}" 
          type="submit" 
          innerText="Save changes"
        }}}
      </div>
    </div>    
    `;
  }
}

export default withRouter(withValidation(ChangeInfoPage as any) as any);
