import { Block, IProps } from '../../core';
import styles from './contextMenu.module.css';

interface ContextMenuProps extends IProps {
  id?: string,
  yield?: string,
  childrenContent?: string[],
  closed?: boolean,
  yieldedComponentOnClick?: (...args: any[]) => void
}

export default class ContextMenu extends Block<ContextMenuProps> {
  public static componentName = 'ContextMenu';

  constructor({ ...props }: ContextMenuProps) {
    const toggleContextMenu = () => {
      this.props.closed = !this.props.closed;
      this.element.classList.toggle(styles.hidden);
    };

    super({
      ...props,
      toggleContextMenu,
      childrenContent: props.yield!.split(','),
    });
  }

  protected render(): string {
    let buffHtml = `<ul id="{{ id }}" class="${styles.contextMenu} ${this.props.closed ? styles.hidden : ''}">`;
    this.props.childrenContent!.forEach((child) => {
      buffHtml += `
        <li>
            ${child}
        </li>
        `;
    });
    buffHtml += '</ul>';

    return buffHtml;
  }
}
