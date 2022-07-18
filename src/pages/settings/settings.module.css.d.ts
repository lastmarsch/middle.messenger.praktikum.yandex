declare namespace SettingsModuleCssNamespace {
  export interface ISettingsModuleCss {
    appContainer: string;
    mainArea: string;
    mainArea__header: string;
    mainArea__links: string;
    mainArea__list: string;
    mainArea__submit: string;
    mainArea__username: string;
    sideButton: string;
  }
}

declare const SettingsModuleCssModule: SettingsModuleCssNamespace.ISettingsModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SettingsModuleCssNamespace.ISettingsModuleCss;
};

export = SettingsModuleCssModule;
