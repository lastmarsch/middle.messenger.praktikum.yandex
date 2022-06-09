import { Block } from 'core';
import styles from './link.module.css';

import routes from '../../const/routes';
import { renderDOM } from '../../core';

interface LinkProps {
  href: string,
  class?: string,
  img?: string,
  text?: string,
}

export default class Link extends Block {
  protected static componentName = 'Link';

  constructor(props: LinkProps) {
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      if (props.href in routes) { renderDOM(routes[props.href]); }
    };
    super({ ...props, events: { click: onClick } });
  }

  protected render(): string {
    return `<a href="{{ href }}" class="{{ class }}">
              <img src="{{ img }}">
              {{ text }}
            </a>`;
  }
}
