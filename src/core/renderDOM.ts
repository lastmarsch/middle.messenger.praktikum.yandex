// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Block, IProps } from './Block';

export default function renderDOM(BlockClass: typeof Block<IProps>) {
  // clear query parameters
  window.history.pushState(null, '', window.location.pathname);

  const block = new BlockClass({});
  const root = document.querySelector('#app');

  root!.innerHTML = '';
  root!.appendChild(block.getContent());
}
