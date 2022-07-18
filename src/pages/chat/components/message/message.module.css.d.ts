declare namespace MessageModuleCssNamespace {
  export interface IMessageModuleCss {
    leftAlign: string;
    message: string;
    message__container: string;
    message__text: string;
    message__time: string;
  }
}

declare const MessageModuleCssModule: MessageModuleCssNamespace.IMessageModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MessageModuleCssNamespace.IMessageModuleCss;
};

export = MessageModuleCssModule;
