import { Block } from '../../../../core';
import styles from './message.module.css';

interface MessageProps {
  author?: number,
  text?: string,
  time?: string,
}

export default class Message extends Block {
  public static componentName = 'Message';

  constructor(props: MessageProps) {
    super({ ...props });
  }

  protected render(): string {
    let buffHtml = `
      <div class="${styles.message}`;
    buffHtml += (this.props.author) ? ` ${styles['left-align']}` : '';
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
