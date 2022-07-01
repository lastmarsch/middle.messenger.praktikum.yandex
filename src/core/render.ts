import { Block, IProps } from './Block';

export default function render(block: Block<IProps>) {
  const root = document.querySelector('#app');
  root!.innerHTML = '';
  root!.appendChild(block.getContent());
}
