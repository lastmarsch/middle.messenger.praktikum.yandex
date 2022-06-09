import { Block } from 'core';
// import './input.css';
import styles from './input.module.css';

export default class Input extends Block {
  protected static componentName = 'Input';

  protected render(): string {
    return `
    <div class="${styles['input-group']}">
        {{#if title}}
        <label for="{{ id }}" class="${styles['input-group__label']}">
            {{ title }}
        </label>
        {{/if}}

        <input 
            type="
            {{#if type}}
                {{ type }}
            {{else}}
                text
            {{/if}}" 
            
            name="{{ name }}" 

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

        <!-- Error  -->
    </div>
    `;
  }
}
