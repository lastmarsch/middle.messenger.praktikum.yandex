import { Block } from 'core';
import styles from './auth.module.css';

export default class SignInPage extends Block {
  render() {
    return `
    <div class="${styles['app-container']}">
      <div class="${styles.container}">
        <span class="${styles.container__title}">
          Sign in
        </span>

        <form id="signin" action="" class="${styles.container__form}">
          {{{ Input id="login" name="login" title="Username" type="text" }}}
          {{{ Input id="password" name="password" title="Password" type="password" }}}
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
