import { Block, IProps } from '../../core';
import styles from './settings.module.css';
import { backPath } from '../../const/images';
import { withRouter } from '../../utils';
import { authService } from '../../services';

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
          .then((r) => {
            // console.log('authService.logout', r);
            this.props.router.go('/');
          })
          .catch((e) => console.log(`%c ${e}`, 'background: #c6282850;'));
      },
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
            edit=false
            onClick=changeAvatar
          }}}
          <span class="${styles['main-area__username']}">{{ user.display_name }}</span>
        </div>
        <div class="${styles['main-area__list']}">
          {{{ SettingsItem title="First name" value=user.first_name readonly="true"}}}
          {{{ SettingsItem title="Second name" value=user.second_name readonly="true"}}}
          {{{ SettingsItem title="Display name" value=user.display_name readonly="true"}}}
          {{{ SettingsItem title="Login" value=user.login readonly="true"}}}
          {{{ SettingsItem title="Email" value=user.email readonly="true"}}}
          {{{ SettingsItem title="Phone" value=user.phone readonly="true"}}}
        </div>
        <div class="${styles['main-area__links']}">
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

export default withRouter(ProfilePage);
