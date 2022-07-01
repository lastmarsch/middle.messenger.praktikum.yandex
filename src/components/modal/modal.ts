import { Block, IProps } from '../../core';
import styles from './modal.module.css';

export interface ModalProps extends IProps {
  id?: string,
  closed?: boolean,
  title?: string,
  yield?: string,
  onSubmit?: (...args: any[]) => void
}

export class Modal extends Block<ModalProps> {
  public static componentName = 'Modal';

  constructor({ onSubmit, ...props }: ModalProps) {
    const toggleModal = () => {
      this.props.closed = !this.props.closed;
      this.element.classList.toggle(styles.hidden);
    };

    super({
      ...props,
      toggleModal,
      events: {
        click: (e) => {
          if (!e.target.closest(`.${styles.modal__body}`)) { this.props.toggleModal(); }
        },
        submit: (e) => {
          e.preventDefault();
          e.stopPropagation();

          const formData = Object.fromEntries(new FormData(e.target));
          console.log(formData);

          // do smth
          if (formData) { onSubmit!(formData); }

          this.props.toggleModal();
        },
      },
    });
  }

  protected render(): string {
    return `  
    <div class="${styles.modal} ${this.props.closed ? styles.hidden : ''}">
      <div class="${styles.modal__body}">
        <span class="${styles.modal__title}">{{ title }}</span>
        <form id="{{ formId }}" class="${styles.modal__form}">
          ${this.props.yield}
        </form>        
      </div>
    </div>
    `;
  }
}
