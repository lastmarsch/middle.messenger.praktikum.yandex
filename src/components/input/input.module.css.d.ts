declare namespace InputModuleCssNamespace {
  export interface IInputModuleCss {
    inputGroup: string;
    inputGroup__error: string;
    inputGroup__input: string;
    inputGroup__label: string;
    invalid: string;
  }
}

declare const InputModuleCssModule: InputModuleCssNamespace.IInputModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: InputModuleCssNamespace.IInputModuleCss;
};

export = InputModuleCssModule;
