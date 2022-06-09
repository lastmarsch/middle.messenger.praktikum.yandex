import { Block } from 'core';

import styles from './message.module.css';

export default class Message extends Block {
  protected static componentName = 'Message';

  protected render(): string {
    let buffHtml = `
      <div class="${styles.message}`;
    buffHtml += (this._props.author) ? `${styles['left-align']}` : '';
    buffHtml += `">
          <div class="${styles.message__container}">
              <span class="${styles.message__text}">
                  {{ text }}
              </span>
              <span class="${styles.message__time}">
                  {{ time }}
              </span>
          </div>
      </div>
      `;
    return buffHtml;
  }
}
