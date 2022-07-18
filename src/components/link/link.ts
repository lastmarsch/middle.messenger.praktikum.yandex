import { Block, IProps } from '@core';
// import styles from './link.module.css';

export interface LinkProps extends IProps {
  href: string,
  class?: string,
  img?: string,
  text?: string,
  onClick?: (...args: any[]) => void
}

export class Link extends Block<IProps> {
  public static componentName = 'Link';

  constructor({ onClick, ...props }: LinkProps) {
    super({ ...props });
    if (onClick) {
      this.setProps({
        events: {
          click: (e) => {
            e.preventDefault();
            onClick!(props);
          },
        },
      });
    }
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
