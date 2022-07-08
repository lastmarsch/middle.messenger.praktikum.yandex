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
      class="${styles.chatItem}
          {{#if opened}}
          ${styles.checked}
          {{/if}}
      "
    >
      <div class="${styles.chatItem__icon}"></div>
      <div class="${styles.chatItem__textGroup}">
        <span class="${styles.textGroup__username}">{{ username }}</span>
        <span class="${styles.textGroup__lastMsg}">{{ lastMessage }}</span>
      </div>
      <div class="${styles.chatItem__msgInfoGroup}">
        <span
          class="${styles.msgInfoGroup__lastOnline}"
          >{{ lastOnline }}</span
        >`;

    buffHtml += (this.props.unreadMessagesCount)
      ? `<span class="${styles.msgInfoGroup__unreadMsg}">{{ unreadMessagesCount }}</span>`
      : '';
    buffHtml += `</div>
            </div>`;
    return buffHtml;
  }
}
