declare namespace ErrorModuleCssNamespace {
  export interface IErrorModuleCss {
    appContainer: string;
    error: string;
    error__link: string;
    error__title: string;
  }
}

declare const ErrorModuleCssModule: ErrorModuleCssNamespace.IErrorModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ErrorModuleCssNamespace.IErrorModuleCss;
};

export = ErrorModuleCssModule;
