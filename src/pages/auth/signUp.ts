import { Block } from 'core';
import styles from './auth.module.css';

export default class SignUpPage extends Block {
  render() {
    return `
    <div class="${styles['app-container']}">
      <div class="${styles.container}">
        <span class="${styles.container__title}">
          Sign up
        </span>
        <form id="signup" action="" class="${styles.container__form}">
          {{{ Input id="first_name" name="first_name" title="First name" type="text"}}}
          {{{ Input id="second_name" name="second_name" title="Second name" type="text"}}}
          {{{ Input id="login" name="login" title="Username" type="text"}}}
          {{{ Input id="email" name="email" title="Email" type="text"}}}
          {{{ Input id="phone" name="phone" title="Phone" type="tel"}}}
          {{{ Input id="password" name="password" title="Password" type="password"}}}
          {{{ Input id="confirm_password" name="confirm_password" title="Confirm password" type="password"}}}
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
