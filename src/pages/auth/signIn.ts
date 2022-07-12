import { SignInRequestData } from '../../api/types';
import { Block, IProps } from '../../core';
import { authService } from '../../services';
import {
  logError, VALIDATION_RULES, withRouter, withValidation,
} from '../../utils';
import styles from './auth.module.css';

class SignInPage extends Block<IProps> {
  constructor(props: IProps) {
    const onSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;

      this.props.validate(form)
        .then((data: SignInRequestData) => {
          authService.signIn(data)
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
      goToSignUp: () => this.props.router.go('/sign-up'),
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
          Sign in
        </span>

        <form id="signin" action="" class="${(styles as any).container__form}">
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
            form="signin" 
            type="submit" 
            class="${(styles as any).container__button}" 
            innerText="Sign in" 
          }}}
          {{{ Link 
            href="/sign-up" 
            class="${(styles as any).container__link}" 
            text="Sign up" 
            onClick=goToSignUp
          }}}
        </div>
      </div>    
    </div> 
    `;
  }
}

export default withRouter(withValidation(SignInPage as any) as any);
