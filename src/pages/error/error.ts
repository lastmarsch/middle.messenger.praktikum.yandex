import { Block } from 'core';
import styles from './error.module.css';

export default class ErrorPage extends Block {
  constructor(code: string = '', text: string = '') {
    super({
      code,
      text,
    });
  }

  render() {
    return `
    <div class="${styles['app-container']}">
      <div class="${styles.error}">
        <span class="${styles.error__title}">
          ${this._props.code}
          <br>
          ${this._props.text}
        </span>
        {{{ Link href="/chat" class="${styles.error__link}" text="Back to chats" }}}
      </div>
    </div>`;
  }
}
