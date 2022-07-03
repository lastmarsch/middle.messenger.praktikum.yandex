import { expect } from 'chai';
import { mockDocument } from '../utils';
import { Block, IProps } from './Block';

mockDocument();

describe('Block', () => {
  class TestBlock extends Block<IProps> {
    render(): string {
      return `<div id="${this.props.id}">Test</div>`;
    }
  }

  const id = 'test';
  const block = new TestBlock({ id });

  it('Should store props', () => {
    expect(block.props.id).to.eq(id);
  });

  it('Should render', () => {
    expect(block.render()).to.eq(`<div id="${id}">Test</div>`);
  });
});
