import { IProps } from '../../core/Block';
import ErrorPage from './error';

export default class Page500Page500 extends ErrorPage {
  constructor(props: IProps) {
    super({
      ...props,
      code: '404',
      text: 'Oops, wrong place!',
    });
  }
}
