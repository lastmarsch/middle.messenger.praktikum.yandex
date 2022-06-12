import { Block } from '../../core';
import styles from './error.module.css';

interface ErrorProps {
  code?: string,
  text?: string,
}

export default class ErrorPage extends Block {
  constructor(props: ErrorProps) {
    super({ ...props });
  }

  protected render() {
    return `
    <div class="${styles['app-container']}">
      <div class="${styles.error}">
        <span class="${styles.error__title}">
          ${this.props.code}
          <br>
          ${this.props.text}
        </span>
        {{{ Link 
          href="/chat" 
          class="${styles.error__link}" 
          text="Back to chats" 
        }}}
      </div>
    </div>`;
  }
}
