import { Block } from 'core';
import styles from './settingsItem.module.css';

export default class SettingsItem extends Block {
  protected static componentName = 'SettingsItem';

  protected render(): string {
    return `
    <div class="${styles['settings-item']}">
        <span class="${styles['settings-item__title']}">
        {{ title }}
        </span>

        <input class="${styles['settings-item__input']}"
            {{#if type}}
              type="{{ type }}"
            {{else}}
              type="text"
            {{/if}}

            {{#if name}}
            name="{{name}}"
            {{/if}}

            {{#if id}}
            id="{{id}}"
            {{/if}} 
            
            {{#if value}}
            value="{{value}}"
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
