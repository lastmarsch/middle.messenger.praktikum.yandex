import { Block } from '../../core';
import { IProps } from '../../core/Block';
import Input from '../../components/input';
import styles from './chat.module.css';
import {
  settingsPath, plusPath, avatarPath, morePath, paperclipPath, sendPath,
} from '../../const/images';
import * as chats from '../../data/chats.json';
import VALIDATION_RULES from '../../utils/validationRules';

export default class ChatPage extends Block {
  constructor(props: IProps) {
    const onSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const data = Object.fromEntries(new FormData(form));

      console.log(data);

      (Object.values(this.children) as Input[]).forEach((child) => {
        if (!document.body.contains(child.element)
        || !child.props.validated
        || !(child.props.id in data)) { return; }

        // some logic here
        child.validateSelf();
      });
    };
    super({ ...props, currentConvoId: 1, events: { submit: onSubmit } });
  }

  protected render() {
    let buffHtml = `
    <div class="${styles['app-container']}">
      <div class="${styles['side-menu']}">
        <div class="${styles['side-menu__panel']}">
          {{{ Link 
            href="/profile" 
            img="${settingsPath}" 
          }}}
          {{{ Input 
            id="search" 
            name="search" 
            type="text" 
            placeholder="Search..."
          }}} 
          {{{ Link 
            href="#" 
            img="${plusPath}" 
          }}}
        </div>

        <div class="${styles['side-menu__list']}">`;

    chats.list.forEach((user: {
      id: number,
      lastOnline: string,
      messages: Array<{ author: number, text: string, time: string }>
      name: string,
      opened: boolean,
      unreadMessagesCount: number
    }) => {
      buffHtml += `
        {{{ ChatListItem
            username="${user.name}"
            lastMessage="${user.messages.slice(-1)[0].text}"
            lastOnline="${user.lastOnline}"
            unreadMessagesCount=${user.unreadMessagesCount}
            opened=${user.opened}
        }}}`;
    });

    buffHtml += `
      </div>
    </div>
    <div class="${styles.main}">
      <div class="${styles.main__panel}">
        <div class="${styles.panel__left}">
          <div class="${styles.panel__icon}">
            <img src="${avatarPath}" />
          </div>
          <div class="${styles['panel__user-info']}">
            <span class="${styles['user-info__username']}"
              >${chats.list[this.props.currentConvoId].name}</span
            >
            <span class="${styles['user-info__last-online']}"
              >Last online:
              ${chats.list[this.props.currentConvoId].lastOnline}</span
            >
          </div>
        </div>
        <a href="#">
          <img src="${morePath}" />
        </a>
      </div>
      <div class="${styles.main__msgs}">`;

    chats.list[this.props.currentConvoId].messages.forEach((msg: {
      author: number,
      text: string,
      time: string
    }) => {
      buffHtml += `
        {{{ Message 
            author=${msg.author}
            text="${msg.text}"
            time="${msg.time}"
        }}}`;
    });

    buffHtml += `
        </div>
        <form id="send" class="${styles['main__edit-msg']}">
          {{{ Link href="#" class="" img="${paperclipPath}" }}}
          {{{ Input 
            id="message" 
            name="message" 
            type="text" 
            placeholder="Start typing..." 
            regexp="${VALIDATION_RULES.message.regexp}"               
            rules="${VALIDATION_RULES.message.rules}" 
            validated=true
          }}}
          {{{ Button 
            id="submit" 
            type="submit" 
            form="send" 
            class="${styles['edit-msg__button']}" 
            innerText="Send message" 
            img="${sendPath}" }}}
        </form>
    </div>
    </div>`;

    return buffHtml;
  }
}
