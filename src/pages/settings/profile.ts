import { Block, IProps } from '@core';
import styles from '@pages/settings/settings.module.css';
import { backPath } from '@const/images';
import { logError, withRouter } from '@utils';
import { authService } from '@services';

class ProfilePage extends Block<IProps> {
  constructor(props: IProps) {
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
      goToMessenger: () => this.props.router.go('/messenger'),
      goToChangeInfo: () => this.props.router.go('/settings-info'),
      goToChangePassword: () => this.props.router.go('/settings-password'),
      goToSignIn: () => {
        authService.logout()
          .then(() => this.props.router.go('/'))
          .catch(logError);
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
            edit=false
            onClick=changeAvatar
          }}}
          <span class="${(styles as any).mainArea__username}">{{ user.display_name }}</span>
        </div>
        <div class="${(styles as any).mainArea__list}">
          {{{ SettingsItem title="First name" value=user.first_name readonly="true"}}}
          {{{ SettingsItem title="Second name" value=user.second_name readonly="true"}}}
          {{{ SettingsItem title="Display name" value=user.display_name readonly="true"}}}
          {{{ SettingsItem title="Login" value=user.login readonly="true"}}}
          {{{ SettingsItem title="Email" value=user.email readonly="true"}}}
          {{{ SettingsItem title="Phone" value=user.phone readonly="true"}}}
        </div>
        <div class="${(styles as any).mainArea__links}">
          {{{ Link 
            href="/settings-info" 
            text="Change profile data"
            onClick=goToChangeInfo
          }}}
          {{{ Link 
            href="/settings-password" 
            text="Change password"
            onClick=goToChangePassword
          }}}
          {{{ Link 
            href="/" 
            text="Log out"
            onClick=goToSignIn
          }}}
        </div>  
      </div>
    </div>    
    `;
  }
}

export default withRouter(ProfilePage as any);
