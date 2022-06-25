import { Block } from '../../core';
import { IProps } from '../../core/Block';
// import styles from './button.module.css';

interface ButtonProps extends IProps {
  type?: 'button' | 'reset' | 'submit',
  form?: string,
  id?: string,
  class?: string,
  innerText?: string,
  img?: string,
  onClick?: (...args: any[]) => void
}

export default class Button extends Block<ButtonProps> {
  public static componentName = 'Button';

  constructor({ onClick, ...props }: ButtonProps) {
    super({
      ...props,
      events: {
        click: onClick!,
      },
    });
  }

  protected render(): string {
    return `
    <button 
      type="{{ type }}" 

      {{#if form}}
      form="{{ form }}" 
      {{/if}}

      {{#if id}}
      id="{{ id }}" 
      {{/if}}

      {{#if class}}
      class="{{ class }}" 
      {{/if}}
    >
      {{#if innerText}}
      <span>{{ innerText }}</span>
      {{/if}}

      {{#if img}}
      <img src="{{ img }}">
      {{/if}}      
    </button>
    `;
  }
}
