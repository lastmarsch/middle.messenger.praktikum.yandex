import { Block } from 'core';
import styles from './input.module.css';

interface InputProps {
  title?: string,
  id?: string,
  type?: string,
  name?: string,
  value?: string,
  placeholder?: string,
  readonly?: boolean,
  required?: boolean,
  regexp?: string,
  rules?: string,
}

export default class Input extends Block {
  protected static componentName = 'Input';

  constructor(props: InputProps) {
    super({
      ...props,
      invalidClassName: styles.invalid,
    });
  }

  componentDidMount() {
    this.addEvents();
  }

  addEvents() {
    const input = this._element.querySelector(`#${this._props.id}`);
    if (!input) { return; }

    input.addEventListener('focus', this.validateSelf.bind(this));
    input.addEventListener('blur', this.validateSelf.bind(this));
  }

  removeEvents() {
    const input = this._element.querySelector(`#${this._props.id}`);
    if (!input) { return; }

    input.removeEventListener('focus', this.validateSelf.bind(this));
    input.addEventListener('blur', this.validateSelf.bind(this));
  }

  protected validateSelf() {
    const input = this._element.querySelector(`#${this._props.id}`);
    if (!input && !this._props.regexp) { return; }

    const text = input.value;
    const isValid = RegExp(this._props.regexp).test(text);
    if (isValid) {
      this._element.classList.remove(this._props.invalidClassName);
    } else { this._element.classList.add(this._props.invalidClassName); }
    return isValid;
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

      <!-- Error  -->
      <span class="${styles['input-group__error']}">{{ rules }}</span>
    </div>
    `;
  }
}
