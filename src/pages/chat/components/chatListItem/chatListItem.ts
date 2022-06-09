import { Block } from 'core';
import styles from './chatListItem.module.css';

export default class ChatListItem extends Block {
  protected static componentName = 'ChatListItem';

  protected render(): string {
    let buffHtml = `
    <div class="${styles['chat-item']}
        {{#if opened}}
        ${styles.checked}
        {{/if}}
    ">
        <div class="${styles['chat-item__icon']}"></div>
        <div class="${styles['chat-item__text-group']}">
            <span class="${styles['text-group__username']}">{{ username }}</span>
            <span class="${styles['text-group__last-msg']}">{{ lastMessage }}</span>
        </div>
        <div class="${styles['chat-item__msg-info-group']}">
            <span class="${styles['msg-info-group__last-online']}">{{ lastOnline }}</span>`;

    buffHtml += (this._props.unreadMessagesCount)
      ? `<span class="${styles['msg-info-group__unread-msg']}">{{ unreadMessagesCount }}</span>`
      : '';
    buffHtml += `</div>
            </div>`;
    return buffHtml;
  }
}
