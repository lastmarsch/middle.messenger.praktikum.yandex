import { ValidatedInput } from '../../components';
import { Block, IProps } from '../../core';
import { authService } from '../../services';
import { VALIDATION_RULES, withRouter } from '../../utils';
import styles from './auth.module.css';

class SignInPage extends Block<IProps> {
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
        authService.signIn(data)
          .then((r) => {
            // console.log('authService.signIn', r);
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
      goToSignUp: () => this.props.router.go('/sign-up'),
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
          Sign in
        </span>

        <form id="signin" action="" class="${styles.container__form}">
          {{{ ValidatedInput 
            id="login" 
            name="login" 
            title="Username" 
            type="text" 
            regexp="${VALIDATION_RULES.login.regexp}" 
            rules="${VALIDATION_RULES.login.rules}" 
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
            form="signin" 
            type="submit" 
            class="${styles.container__button}" 
            innerText="Sign in" 
          }}}
          {{{ Link 
            href="/sign-up" 
            class="${styles.container__link}" 
            text="Sign up" 
            onClick=goToSignUp
          }}}
        </div>
      </div>    
    </div> 
    `;
  }
}

export default withRouter(SignInPage);
