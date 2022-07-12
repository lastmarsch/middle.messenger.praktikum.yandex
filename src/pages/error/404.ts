import ErrorPage, { ErrorProps } from './error';

export default class Page404 extends (ErrorPage as any) {
  constructor(props: ErrorProps) {
    super({
      ...props,
      code: '404',
      text: 'Oops, wrong place!',
    });
  }
}
