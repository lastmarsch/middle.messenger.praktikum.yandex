import ErrorPage, { ErrorProps } from './error';

export default class Page500 extends (ErrorPage as any) {
  constructor(props: ErrorProps) {
    super({
      ...props,
      code: '500',
      text: 'We are already fixing it!',
    });
  }
}
