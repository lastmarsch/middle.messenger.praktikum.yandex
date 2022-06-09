import { Block } from 'core';
import styles from './button.module.css';

export default class Button extends Block {
  protected static componentName = 'Button';

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
