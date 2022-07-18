declare namespace ModalModuleCssNamespace {
  export interface IModalModuleCss {
    hidden: string;
    modal: string;
    modal__body: string;
    modal__form: string;
    modal__title: string;
  }
}

declare const ModalModuleCssModule: ModalModuleCssNamespace.IModalModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ModalModuleCssNamespace.IModalModuleCss;
};

export = ModalModuleCssModule;
