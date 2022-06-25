import { Block } from '../../core';
import { IProps } from '../../core/Block';
import styles from './input.module.css';

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

export default class Input extends Block<InputProps> {
  public static componentName = 'Input';

  constructor({ onFocus, onBlur, ...props }: InputProps) {
    super({
      ...props,
      events: {
        focus: onFocus!,
        blur: onBlur!,
      },
    });
  }

  protected render(): string {
    return `
    <div class="${styles['input-group']}">
      {{#if title}}
      <label for="{{ id }}" class="${styles['input-group__label']}">
        {{ title }}
      </label>
      {{/if}}

      <input 
        type={{#if type}}"{{ type }}"{{else}}"text"{{/if}}

        name={{#if name}}"{{ name }}"{{/if}}

        {{#if id}}
        id="{{ id }}"
        {{/if}}

        class="${styles['input-group__input']}"

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
    </div>
    `;
  }
}
