import ErrorPage from './error';

export default class Page500 extends ErrorPage {
  constructor() {
    super('500', 'We are already fixing it!');
  }
}
