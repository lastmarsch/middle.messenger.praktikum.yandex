import Input from '../../../../components/input';
import styles from './settingsItem.module.css';

interface SettingsItemProps {
  title?: string,
  type?: string,
  name?: string,
  id?: string,
  value?: string,
  placeholder?: string,
  rules?: string,
  invalidClassName?: string,
}

export default class SettingsItem extends Input {
  public static componentName = 'SettingsItem';

  constructor(props: SettingsItemProps) {
    super({ ...props });

    this.setProps({ invalidClassName: styles.invalid });
  }

  protected render(): string {
    return `
    <div class="${styles['settings-item']}">
      <div class="${styles['settings-item__input-group']}">
        <label class="${styles['settings-item__title']}">
          {{ title }}
        </label>
  
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
        >
      </div>
  
      <!-- Error  -->
      <span class="${styles['settings-item__error']}">{{ rules }}</span>
    </div>  
    `;
  }
}