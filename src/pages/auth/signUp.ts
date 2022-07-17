import { SignUpRequestData } from '@api/types';
import { Block, IProps } from '@core';
import { authService } from '@services';
import {
  logError, VALIDATION_RULES, withRouter, withValidation,
} from '@utils';
import styles from '@pages/auth/auth.module.css';

class SignUpPage extends Block<IProps> {
  constructor(props: IProps) {
    const onSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;

      this.props.validate(form)
        .then((data: SignUpRequestData) => {
          authService.signUp(data)
            .then(() => this.props.router.go('/messenger'))
            .catch(logError);
        })
        .catch(logError);
    };

    authService.getCurrentUser()
      .then(() => this.props.router.go('/messenger'))
      .catch(logError);

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
      .then(() => this.props.router.go('/messenger'))
      .catch(logError);

    super.show();
  }

  protected render() {
    return `
    <div class="${styles.appContainer}">
      <div class="${styles.container}">
        <span class="${(styles as any).container__title}">
          Sign up
        </span>
        <form id="signup" action="" class="${(styles as any).container__form}">
          {{{ Input 
            id="first_name" 
            name="first_name" 
            title="First name" 
            type="text"
            regexp="${VALIDATION_RULES.first_name.regexp}" 
            rules="${VALIDATION_RULES.first_name.rules}" 
            onFocus=validateInput
            onBlur=validateInput
          }}}
          {{{ Input 
            id="second_name" 
            name="second_name" 
            title="Second name" 
            type="text"
            regexp="${VALIDATION_RULES.second_name.regexp}" 
            rules="${VALIDATION_RULES.second_name.rules}" 

            onFocus=validateInput
            onBlur=validateInput
          }}}
          {{{ Input 
            id="login" 
            name="login" 
            title="Username" 
            type="text"
            regexp="${VALIDATION_RULES.login.regexp}" 
            rules="${VALIDATION_RULES.login.rules}" 

            onFocus=validateInput
            onBlur=validateInput
          }}}
          {{{ Input 
            id="email" 
            name="email" 
            title="Email" 
            type="text"
            regexp="${VALIDATION_RULES.email.regexp}" 
            rules="${VALIDATION_RULES.email.rules}" 

            onFocus=validateInput
            onBlur=validateInput
          }}}
          {{{ Input 
            id="phone" 
            name="phone" 
            title="Phone" 
            type="tel"
            regexp="${VALIDATION_RULES.phone.regexp}" 
            rules="${VALIDATION_RULES.phone.rules}" 

            onFocus=validateInput
            onBlur=validateInput
          }}}
          {{{ Input 
            id="password" 
            name="password" 
            title="Password" 
            type="password"
            regexp="${VALIDATION_RULES.password.regexp}" 
            rules="${VALIDATION_RULES.password.rules}" 

            onFocus=validateInput
            onBlur=validateInput
          }}}
        </form>

        <div class="${(styles as any).container__form}">
          {{{ Button 
            form="signup" 
            type="submit" 
            class="${(styles as any).container__button}" 
            innerText="Sign up"
          }}}
          {{{ Link 
            href="/" 
            class="${(styles as any).container__link}" 
            text="Sign in" 
            onClick=goToSignIn
          }}}
        </div>
      </div>
    </div>    
    `;
  }
}

export default withRouter(withValidation(SignUpPage as any) as any);
