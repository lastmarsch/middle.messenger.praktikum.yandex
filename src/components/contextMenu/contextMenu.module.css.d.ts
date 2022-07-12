declare namespace ContextMenuModuleCssNamespace {
  export interface IContextMenuModuleCss {
    contextMenu: string;
    hidden: string;
  }
}

declare const ContextMenuModuleCssModule: ContextMenuModuleCssNamespace.IContextMenuModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ContextMenuModuleCssNamespace.IContextMenuModuleCss;
};

export = ContextMenuModuleCssModule;
