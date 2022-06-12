import Input from '../../components/input';
import { Block } from '../../core';
import { IProps } from '../../core/Block';
import validationRules from '../../utils/validationRules';
import styles from './auth.module.css';

export default class SignInPage extends Block {
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
          Sign in
        </span>

        <form id="signin" action="" class="${styles.container__form}">
          {{{ Input 
            id="login" 
            name="login" 
            title="Username" 
            type="text" 
            regexp="${validationRules.login.regexp}" 
            rules="${validationRules.login.rules}" 
            validated=true
          }}}
          {{{ Input 
            id="password" 
            name="password" 
            title="Password" 
            type="password" 
            regexp="${validationRules.password.regexp}" 
            rules="${validationRules.password.rules}" 
            validated=true
          }}}
        </form>

        <div class="${styles.container__form}">
          {{{ Button id="submit" form="signin" type="submit" class="${styles.container__button}" innerText="Sign in" }}}
          {{{ Link href="/signUp" class="${styles.container__link}" text="Sign up" }}}
        </div>
      </div>    
    </div> 
    `;
  }
}
