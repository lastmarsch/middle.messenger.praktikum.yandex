import { IProps } from '../../core';
import ErrorPage from './error';

export default class Page404 extends ErrorPage {
  constructor(props: IProps) {
    super({
      ...props,
      code: '404',
      text: 'Oops, wrong place!',
    });
  }
}
