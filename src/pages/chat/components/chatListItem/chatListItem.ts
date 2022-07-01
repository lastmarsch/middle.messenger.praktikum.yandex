import { Block, IProps } from '../../../../core';
import styles from './chatListItem.module.css';

interface ChatListItemProps extends IProps {
  chatId?: number,
  opened?: boolean,
  username?: string,
  lastMessage?: string,
  lastOnline?: string,
  unreadMessagesCount?: number,
  onClick?: (...args: any[]) => void
}

export default class ChatListItem extends Block<IProps> {
  public static componentName = 'ChatListItem';

  constructor(props: ChatListItemProps) {
    super({
      ...props,
      events: {
        click: (e) => {
          e.stopPropagation();

          const openChatEvent = new CustomEvent('openChat', { detail: this.props.chatId, bubbles: true });
          this.element.dispatchEvent(openChatEvent);
        },
      },
    });
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
