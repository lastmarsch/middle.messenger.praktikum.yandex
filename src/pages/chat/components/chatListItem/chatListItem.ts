import { Block } from '../../../../core';
import styles from './chatListItem.module.css';

interface ChatListItemProps {
  opened?: boolean,
  username?: string,
  lastMessage?: string,
  lastOnline?: string,
  unreadMessagesCount?: number,
}

export default class ChatListItem extends Block {
  public static componentName = 'ChatListItem';

  constructor(props: ChatListItemProps) {
    super({ ...props });
  }

  protected render(): string {
    let buffHtml = `
    <div
      class="${styles['chat-item']}
          {{#if opened}}
          ${styles.checked}
          {{/if}}
      "
    >
      <div class="${styles['chat-item__icon']}"></div>
      <div class="${styles['chat-item__text-group']}">
        <span class="${styles['text-group__username']}">{{ username }}</span>
        <span class="${styles['text-group__last-msg']}">{{ lastMessage }}</span>
      </div>
      <div class="${styles['chat-item__msg-info-group']}">
        <span
          class="${styles['msg-info-group__last-online']}"
          >{{ lastOnline }}</span
        >`;

    buffHtml += (this.props.unreadMessagesCount)
      ? `<span class="${styles['msg-info-group__unread-msg']}">{{ unreadMessagesCount }}</span>`
      : '';
    buffHtml += `</div>
            </div>`;
    return buffHtml;
  }
}
