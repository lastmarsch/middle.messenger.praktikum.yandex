import ErrorPage, { ErrorProps } from '@pages/error/error';

export default class Page404 extends (ErrorPage as any) {
  constructor(props: ErrorProps) {
    super({
      ...props,
      code: '404',
      text: 'Oops, wrong place!',
    });
  }
}
