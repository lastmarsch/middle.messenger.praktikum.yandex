import { IProps } from '../../core/Block';
import ErrorPage from './error';

export default class Page500 extends ErrorPage {
  constructor(props: IProps) {
    super({
      ...props,
      code: '500',
      text: 'We are already fixing it!',
    });
  }
}
