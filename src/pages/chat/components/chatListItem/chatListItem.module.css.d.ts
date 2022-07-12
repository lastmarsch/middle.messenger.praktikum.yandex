declare namespace ChatListItemModuleCssNamespace {
  export interface IChatListItemModuleCss {
    chatItem: string;
    chatItem__icon: string;
    chatItem__msgInfoGroup: string;
    chatItem__textGroup: string;
    checked: string;
    msgInfoGroup__lastOnline: string;
    msgInfoGroup__unreadMsg: string;
    textGroup__lastMsg: string;
    textGroup__username: string;
  }
}

declare const ChatListItemModuleCssModule: ChatListItemModuleCssNamespace.IChatListItemModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ChatListItemModuleCssNamespace.IChatListItemModuleCss;
};

export = ChatListItemModuleCssModule;
