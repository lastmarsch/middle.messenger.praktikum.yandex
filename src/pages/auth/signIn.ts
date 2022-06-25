import ValidatedInput from '../../components/validatedInput';
import routes from '../../const/routes';
import { Block, renderDOM } from '../../core';
import { IProps } from '../../core/Block';
import VALIDATION_RULES from '../../utils/validationRules';
import styles from './auth.module.css';

export default class SignInPage extends Block<IProps> {
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
            href="/signUp" 
            class="${styles.container__link}" 
            text="Sign up" 
            onClick=onClick
          }}}
        </div>
      </div>    
    </div> 
    `;
  }
}
