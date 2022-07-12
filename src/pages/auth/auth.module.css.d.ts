declare namespace AuthModuleCssNamespace {
  export interface IAuthModuleCss {
    appContainer: string;
    container: string;
    container__button: string;
    container__error: string;
    container__form: string;
    container__link: string;
    container__title: string;
  }
}

declare const AuthModuleCssModule: AuthModuleCssNamespace.IAuthModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AuthModuleCssNamespace.IAuthModuleCss;
};

export = AuthModuleCssModule;
