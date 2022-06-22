import { Block } from '../../core';
import { IProps } from '../../core/Block';
import Input from '../../components/input';
import VALIDATION_RULES from '../../utils/validationRules';
import styles from './auth.module.css';

export default class SignUpPage extends Block {
  constructor(props: IProps) {
    const onSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const data = Object.fromEntries(new FormData(form));

      console.log(data);

      (Object.values(this.children) as Input[]).forEach((child) => {
        if (!document.body.contains(child.element)
        || !child.props.validated
        || !(child.props.id in data)) { return; }

        // some logic here
        child.validateSelf();
      });
    };
    super({ ...props, events: { submit: onSubmit } });
  }

  protected render() {
    return `
    <div class="${styles['app-container']}">
      <div class="${styles.container}">
        <span class="${styles.container__title}">
          Sign up
        </span>
        <form id="signup" action="" class="${styles.container__form}">
          {{{ Input 
            id="first_name" 
            name="first_name" 
            title="First name" 
            type="text"
            regexp="${VALIDATION_RULES.first_name.regexp}" 
            rules="${VALIDATION_RULES.first_name.rules}" 
            validated=true
          }}}
          {{{ Input 
            id="second_name" 
            name="second_name" 
            title="Second name" 
            type="text"
            regexp="${VALIDATION_RULES.second_name.regexp}" 
            rules="${VALIDATION_RULES.second_name.rules}" 
            validated=true
          }}}
          {{{ Input 
            id="login" 
            name="login" 
            title="Username" 
            type="text"
            regexp="${VALIDATION_RULES.login.regexp}" 
            rules="${VALIDATION_RULES.login.rules}" 
            validated=true
          }}}
          {{{ Input 
            id="email" 
            name="email" 
            title="Email" 
            type="text"
            regexp="${VALIDATION_RULES.email.regexp}" 
            rules="${VALIDATION_RULES.email.rules}" 
            validated=true
          }}}
          {{{ Input 
            id="phone" 
            name="phone" 
            title="Phone" 
            type="tel"
            regexp="${VALIDATION_RULES.phone.regexp}" 
            rules="${VALIDATION_RULES.phone.rules}" 
            validated=true
          }}}
          {{{ Input 
            id="password" 
            name="password" 
            title="Password" 
            type="password"
            regexp="${VALIDATION_RULES.password.regexp}" 
            rules="${VALIDATION_RULES.password.rules}" 
            validated=true
          }}}
        </form>

        <div class="${styles.container__form}">
          {{{ Button id="submit" form="signup" type="submit" class="${styles.container__button}" innerText="Sign up"}}}
          {{{ Link href="/signIn" class="${styles.container__link}" text="Sign in" }}}
        </div>
      </div>
    </div>    
    `;
  }
}
