/* eslint-disable max-classes-per-file */
import { expect } from 'chai';
import { mockDocument } from '../../utils';
import { Block, IProps } from '../Block';
import Router from './Router';

mockDocument();

describe('Router', () => {
  class TestBlock extends Block<IProps> {
    render(): string {
      return `<div id="${this.props.id}">Test</div>`;
    }
  }

  it('Should be a singleton', () => {
    const router = new Router();
    const otherRouter = new Router();
    expect(router).to.eq(otherRouter);
  });

  it('Should store used routes', () => {
    class TestBlock2 extends TestBlock {}
    class TestBlock3 extends TestBlock {}
    const router = new Router();
    router
      .use('/block', TestBlock, { id: 'test' })
      .use('/block2', TestBlock2, { id: 'test2' })
      .use('/block3', TestBlock3, { id: 'test3' });
    expect(router.routes.length).to.eq(3);
  });
});
