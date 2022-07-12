declare namespace ChatModuleCssNamespace {
  export interface IChatModuleCss {
    appContainer: string;
    editMsg__button: string;
    empty: string;
    main: string;
    main__editMsg: string;
    main__msgs: string;
    main__panel: string;
    panel__icon: string;
    panel__left: string;
    panel__userInfo: string;
    sideMenu: string;
    sideMenu__list: string;
    sideMenu__panel: string;
    userInfo__lastOnline: string;
    userInfo__username: string;
  }
}

declare const ChatModuleCssModule: ChatModuleCssNamespace.IChatModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ChatModuleCssNamespace.IChatModuleCss;
};

export = ChatModuleCssModule;
