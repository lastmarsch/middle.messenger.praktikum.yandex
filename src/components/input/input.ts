import { Block, IProps } from '@core';
import styles from '@components/input/input.module.css';

export interface InputProps extends IProps {
  title?: string,
  id?: string,
  type?: 'button' | 'checkbox' | 'file' | 'hidden' | 'image' | 'password' | 'radio' | 'reset' | 'submit' | 'text',
  name?: string,
  value?: string,
  placeholder?: string,
  readonly?: boolean,
  required?: boolean,
  regexp?: string,
  rules?: string,
  invalidClassName?: string,
  onFocus?: (...args: any[]) => void,
  onBlur?: (...args: any[]) => void,
}

export class Input extends Block<InputProps> {
  public static componentName = 'Input';

  constructor({ onFocus, onBlur, ...props }: InputProps) {
    super({
      ...props,
      invalidClassName: styles.invalid,
      onFocus: (e) => {
        e.stopPropagation();
        if (onFocus) onFocus(this);
      },
      onBlur: (e) => {
        e.stopPropagation();
        if (onBlur) onBlur(this);
      },
      events: {
        focus: onFocus!,
        blur: onBlur!,
      },
    });
  }

  addEvents() {
    const input = this._element.querySelector(`#${this.props.id}`);
    if (!input || !this.props.onFocus || !this.props.onBlur) { return; }

    input.addEventListener('focus', this.props.onFocus);
    input.addEventListener('blur', this.props.onBlur);
  }

  removeEvents() {
    const input = this._element.querySelector(`#${this.props.id}`);
    if (!input || !this.props.onFocus || !this.props.onBlur) { return; }

    input.removeEventListener('focus', this.props.onFocus);
    input.removeEventListener('blur', this.props.onBlur);
  }

  protected render(): string {
    return `
    <div class="${styles.inputGroup}">
      {{#if title}}
      <label for="{{ id }}" class="${(styles as any).inputGroup__label}">
        {{ title }}
      </label>
      {{/if}}

      <input 
        type={{#if type}}"{{ type }}"{{else}}"text"{{/if}}

        name={{#if name}}"{{ name }}"{{/if}}

        {{#if id}}
        id="{{ id }}"
        {{/if}}

        class="${(styles as any).inputGroup__input}"

        {{#if value}}
        value="{{ value }}"
        {{/if}}

        {{#if placeholder}}
        placeholder="{{placeholder}}"
        {{/if}}

        {{#if readonly}}
        readonly
        {{/if}}
      >

      <!-- Error  -->
      <span class="${(styles as any).inputGroup__error}">{{ rules }}</span>
    </div>
    `;
  }
}
