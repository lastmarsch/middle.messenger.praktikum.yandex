import { Block } from '../../core';
// import styles from './button.module.css';

interface ButtonProps {
  type?: string,
  form?: string,
  id?: string,
  class?: string,
  innerText?: string,
  img?: string,
}

export default class Button extends Block {
  public static componentName = 'Button';

  constructor(props: ButtonProps) {
    super({ ...props });
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
