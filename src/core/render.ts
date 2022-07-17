import { Block, IProps } from '@core/Block';

export default function render(block: Block<IProps>) {
  let root = document.querySelector('#app');
  if (!root) {
    root = document.createElement('div');
    root.id = 'app';
    document.body.appendChild(root);
  }
  root.innerHTML = '';
  root.appendChild(block.getContent());
}
