import ErrorPage from './error';

export default class Page500Page500 extends ErrorPage {
  constructor() {
    super('404', 'Oops, wrong place!');
  }
}
