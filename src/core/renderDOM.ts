import Block from './Block';

export default function renderDOM(BlockClass: typeof Block) {
  // clear query parameters
  window.history.pushState(null, '', window.location.pathname);

  const block = new BlockClass();
  const root = document.querySelector('#app');

  root!.innerHTML = '';
  root!.appendChild(block.getContent());
}
