import { ValidatedInput } from '../../components';
import { Block, IProps } from '../../core';
import { authService } from '../../services';
import { VALIDATION_RULES, withRouter } from '../../utils';
import styles from './auth.module.css';

class SignUpPage extends Block<IProps> {
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
        authService.signUp(data)
          .then((r) => {
            // console.log('authService.signUp', r);
            this.props.router.go('/messenger');
          })
          .catch((e) => console.log(`%c ${e}`, 'background: #c6282850;'));
      }
    };

    authService.getCurrentUser()
      .then((r) => {
        // console.log('authService.getCurrentUser', r);
        this.props.router.go('/messenger');
      })
      .catch((e) => console.log(`%c ${e}`, 'background: #c6282850;'));

    super({
      ...props,
      goToSignIn: () => this.props.router.go('/'),
      events: {
        submit: onSubmit,
      },
    });
  }

  show(): void {
    authService.getCurrentUser()
      .then((r) => {
      // console.log('authService.getCurrentUser', r);
        this.props.router.go('/messenger');
      })
      .catch((e) => console.log(`%c ${e}`, 'background: #c6282850;'));

    super.show();
  }

  protected render() {
    return `
    <div class="${styles['app-container']}">
      <div class="${styles.container}">
        <span class="${styles.container__title}">
          Sign up
        </span>
        <form id="signup" action="" class="${styles.container__form}">
          {{{ ValidatedInput 
            id="first_name" 
            name="first_name" 
            title="First name" 
            type="text"
            regexp="${VALIDATION_RULES.first_name.regexp}" 
            rules="${VALIDATION_RULES.first_name.rules}" 
          }}}
          {{{ ValidatedInput 
            id="second_name" 
            name="second_name" 
            title="Second name" 
            type="text"
            regexp="${VALIDATION_RULES.second_name.regexp}" 
            rules="${VALIDATION_RULES.second_name.rules}" 
          }}}
          {{{ ValidatedInput 
            id="login" 
            name="login" 
            title="Username" 
            type="text"
            regexp="${VALIDATION_RULES.login.regexp}" 
            rules="${VALIDATION_RULES.login.rules}" 
          }}}
          {{{ ValidatedInput 
            id="email" 
            name="email" 
            title="Email" 
            type="text"
            regexp="${VALIDATION_RULES.email.regexp}" 
            rules="${VALIDATION_RULES.email.rules}" 
          }}}
          {{{ ValidatedInput 
            id="phone" 
            name="phone" 
            title="Phone" 
            type="tel"
            regexp="${VALIDATION_RULES.phone.regexp}" 
            rules="${VALIDATION_RULES.phone.rules}" 
          }}}
          {{{ ValidatedInput 
            id="password" 
            name="password" 
            title="Password" 
            type="password"
            regexp="${VALIDATION_RULES.password.regexp}" 
            rules="${VALIDATION_RULES.password.rules}" 
          }}}
        </form>

        <div class="${styles.container__form}">
          {{{ Button 
            form="signup" 
            type="submit" 
            class="${styles.container__button}" 
            innerText="Sign up"
          }}}
          {{{ Link 
            href="/" 
            class="${styles.container__link}" 
            text="Sign in" 
            onClick=goToSignIn
          }}}
        </div>
      </div>
    </div>    
    `;
  }
}

export default withRouter(SignUpPage);
