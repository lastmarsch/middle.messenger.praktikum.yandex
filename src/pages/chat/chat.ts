import { Block, IProps } from '../../core';
import styles from './chat.module.css';
import {
  settingsPath, plusPath, morePath, paperclipPath, sendPath,
} from '../../const/images';
import {
  formatDateTime, VALIDATION_RULES, withRouter,
} from '../../utils';
import { authService, chatService } from '../../services';
import { ValidatedInput } from '../../components';

class ChatPage extends Block<IProps> {
  constructor(props: IProps) {
    const onSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const data = Object.fromEntries(new FormData(form));

      console.log(data);

      let isValid = false;
      (Object.values(this.children) as ValidatedInput[]).forEach((child) => {
        if (!document.body.contains(child.element)
        || !(child.validateSelf)
        || !(child.props.id! in data)) { return; }

        // some logic here
        isValid = child.validateSelf();
      });

      if (isValid) { chatService.sendMessage(data); }
    };

    // manage modal & context menu visibility
    const showCreateChatModal = () => {
      const modal = Object.values(this.children).find((item) => item.props.id === 'createChatModal');
      if (modal) { modal.props.toggleModal(); }
    };

    const toggleChatMenu = () => {
      const contextMenu = Object.values(this.children).find((item) => item.props.id === 'chatMenu');
      if (contextMenu) contextMenu.props.toggleContextMenu();
    };

    // chats
    const getChats = () => {
      chatService.getChats()
        .then((r) => {
          this.setProps({ chats: r });
        })
        .catch((e) => console.log(`%c ${e}`, 'background: #c6282850;'));
    };

    const createChatWithUser = (data) => {
      chatService.createChatWithUser(data, this.props.user.id)
        .then((r) => getChats())
        .catch((e) => console.log(`%c ${e}`, 'background: #c6282850;'));
    };

    const leaveChat = () => {
      chatService.leaveChat({
        users: [this.props.user.id],
        chatId: this.props.currentConvoId,
      })
        .then((r) => {
          this.setProps({ currentConvoId: null });
          getChats();
        })
        .catch((e) => console.log(`%c ${e}`, 'background: #c6282850;'));
    };

    const deleteChat = () => {
      chatService.deleteChat({ chatId: this.props.currentConvoId })
        .then((r) => {
          this.setProps({ currentConvoId: null });
          getChats();
        })
        .catch((e) => console.log(`%c ${e}`, 'background: #c6282850;'));
    };

    const onOpenChat = (e: CustomEvent) => {
      const chatId = +e.detail;
      chatService.connectToWS(
        { chatId },
        this.props.user.id,
        ((messages) => { this.setProps({ messages }); }),
      );
      this.setProps({
        currentConvoId: chatId,
      });
    };

    super({
      ...props,
      showCreateChatModal,
      toggleChatMenu,
      createChatWithUser,
      getChats,
      leaveChat,
      deleteChat,
      chats: [],
      currentConvoId: null,
      messages: [],
      user: null,
      goToSettings: () => this.props.router.go('/settings'),
      events: {
        submit: onSubmit,
        openChat: onOpenChat,
      },
    });
  }

  componentDidMount(): void {
    authService.getCurrentUser()
      .then((user) => {
        this.setProps({ user });
      })
      .catch((e) => this.props.router.go('/'));

    this.props.getChats();
  }

  protected render() {
    let buffHtml = `
    <div class="${styles['app-container']}">
      <div class="${styles['side-menu']}">
        <div class="${styles['side-menu__panel']}">
          {{{ Link 
            href="/settings" 
            img="${settingsPath}" 
            onClick=goToSettings
          }}}
          {{{ Input 
            id="search" 
            name="search" 
            type="text" 
            placeholder="Search..."
          }}} 
          {{{ Link 
            href="" 
            img="${plusPath}" 
            onClick=showCreateChatModal
          }}}
        </div>

        <div class="${styles['side-menu__list']}">
        `;

    this.props.chats.forEach((chat: Chat) => {
      buffHtml += `
      {{{ ChatListItem
        chatId=${chat.id}
        username="${chat.title}"
        lastMessage="${chat.last_message ? chat.last_message.content : ''}"
        lastOnline="${chat.last_message ? formatDateTime(chat.last_message.time) : ''}"
        unreadMessagesCount=${chat.unread_count}
        opened=false
      }}}`;
    });

    buffHtml += `
      </div>
    </div>
    
    {{#if currentConvoId}}`;

    const currentChat = this.props.chats.find(
      (chat: Chat) => chat.id === this.props.currentConvoId,
    );

    buffHtml += `
    <div class="${styles.main}">
      <div class="${styles.main__panel}">
        <div class="${styles.panel__left}">
          <div class="${styles.panel__icon}">
            <img src="" />
          </div>
          <div class="${styles['panel__user-info']}">
            <span class="${styles['user-info__username']}"
              >${currentChat ? currentChat.title : ''}</span>
            <span class="${styles['user-info__last-online']}"
              >Last online: <time> </time> </span>
          </div>
        </div>
        {{{ Link 
          href="" 
          img="${morePath}" 
          onClick=toggleChatMenu
        }}}
        {{{ ContextMenu
          id="chatMenu"
          closed=true
          leaveChat=leaveChat
          deleteChat=deleteChat
          yield='
          {{{ Link
            href=""
            text="Leave chat" 
            onClick=leaveChat
          }}}`;

    if (currentChat && currentChat.created_by === this.props.user.id) {
      buffHtml += `,
          {{{ Link
            href=""
            text="Delete chat" 
            onClick=deleteChat
          }}}`;
    }

    buffHtml += `'
        }}}
      </div>
      <div class="${styles.main__msgs}">`;

    this.props.messages.forEach((msg: Message) => {
      buffHtml += `
        {{{ Message
            isAuthor=${msg.user_id === this.props.user.id}
            text="${msg.content}"
            time="${formatDateTime(msg.time)}"
        }}}`;
    });

    buffHtml += `
      </div>
      <form id="send" class="${styles['main__edit-msg']}">
        {{{ Link 
          href="#"             
          class="" 
          img="${paperclipPath}" 
        }}}
        {{{ ValidatedInput 
          id="message" 
          name="message" 
          type="text" 
          placeholder="Start typing..." 
          regexp="${VALIDATION_RULES.message.regexp}"               
          rules="${VALIDATION_RULES.message.rules}" 
        }}}
        {{{ Button 
          type="submit" 
          form="send" 
          class="${styles['edit-msg__button']}" 
          innerText="Send message" 
          img="${sendPath}" 
        }}}
      </form>
    </div>

    {{else}}

    <div class="${styles.empty}">
      <span>Select a chat from the chat list or create a new one.</span>
    </div>

    {{/if}}

    {{{Modal
      id="createChatModal"
      title="Create a chat"
      formId="createChat"
      closed=true
      yield='
        {{{ Input 
          id="title" 
          name="title" 
          type="text" 
          title="Title"
        }}}
        {{{ Input 
          id="user" 
          name="user" 
          type="text" 
          title="User with ID"
        }}}
        {{{ Button 
          type="submit" 
          form="createChat" 
          innerText="Create" 
        }}}
      '
      onSubmit=createChatWithUser
    }}}
    </div>    
    `;

    return buffHtml;
  }
}

export default withRouter(ChatPage);
