import { Input, InputProps } from '../input';
import styles from './validatedInput.module.css';

export default class ValidatedInput extends Input {
  public static componentName = 'ValidatedInput';

  constructor({ onFocus, onBlur, ...props }: InputProps) {
    super({
      ...props,
      invalidClassName: styles.invalid,
    });
  }

  componentDidMount() {
    this.addEvents();
  }

  addEvents() {
    const input = this._element.querySelector(`#${this.props.id}`);
    if (!input) { return; }

    input.addEventListener('focus', this.validateSelf.bind(this));
    input.addEventListener('blur', this.validateSelf.bind(this));
  }

  removeEvents() {
    const input = this._element.querySelector(`#${this.props.id}`);
    if (!input) { return; }

    input.removeEventListener('focus', this.validateSelf.bind(this));
    input.addEventListener('blur', this.validateSelf.bind(this));
  }

  validateSelf(): boolean {
    const input: HTMLInputElement = this._element.querySelector(`#${this.props.id}`)!;
    if (!input && !this.props.regexp) { return false; }

    const text = input.value;
    const isValid = RegExp(this.props.regexp as string).test(text);
    if (isValid) {
      this._element.classList.remove(this.props.invalidClassName as string);
    } else { this._element.classList.add(this.props.invalidClassName as string); }

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
