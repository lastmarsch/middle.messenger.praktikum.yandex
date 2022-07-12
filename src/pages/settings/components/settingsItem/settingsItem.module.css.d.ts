declare namespace SettingsItemModuleCssNamespace {
  export interface ISettingsItemModuleCss {
    invalid: string;
    settingsItem: string;
    settingsItem__error: string;
    settingsItem__input: string;
    settingsItem__inputGroup: string;
    settingsItem__title: string;
  }
}

declare const SettingsItemModuleCssModule: SettingsItemModuleCssNamespace.ISettingsItemModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SettingsItemModuleCssNamespace.ISettingsItemModuleCss;
};

export = SettingsItemModuleCssModule;
