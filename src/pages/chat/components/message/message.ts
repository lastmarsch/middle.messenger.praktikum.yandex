import { Block, IProps } from '../../../../core';
import styles from './message.module.css';

interface MessageProps extends IProps {
  isAuthor?: boolean,
  text?: string,
  time?: string,
}

export default class Message extends Block<IProps> {
  public static componentName = 'Message';

  constructor(props: MessageProps) {
    super({ ...props });
  }

  protected render(): string {
    let buffHtml = `
      <div class="${styles.message}`;
    buffHtml += (!this.props.isAuthor) ? ` ${styles.leftAlign}` : '';
    buffHtml += `">
      <div class="${(styles as any).message__container}">
        <span class="${(styles as any).message__text}">
          {{ text }}
        </span>
        <time class="${(styles as any).message__time}">
          {{ time }}
        </time>
      </div>
    </div>
    `;
    return buffHtml;
  }
}
