import { Block } from '../../core';
import { IProps } from '../../core/Block';
// import styles from './link.module.css';

interface LinkProps extends IProps {
  href: string,
  class?: string,
  img?: string,
  text?: string,
  onClick?: (...args: any[]) => void
}

export default class Link extends Block<IProps> {
  public static componentName = 'Link';

  constructor({ onClick, ...props }: LinkProps) {
    super({ ...props });
    this.setProps({
      events: {
        click: (e) => {
          e.preventDefault();
          onClick!(props);
        },
      },
    });
  }

  protected render(): string {
    return `  
    <a 
      href="{{ href }}" 
      class="{{ class }}"
    >
      <img src="{{ img }}" />
      {{ text }}
    </a>`;
  }
}
