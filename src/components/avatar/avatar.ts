import apiEndpoint from '@const/apiEndpoint';
import { Block, IProps } from '@core';
import styles from '@components/avatar/avatar.module.css';

export interface AvatarProps extends IProps {
  id?: string,
  name?: string,
  avatar?: string,
  edit?: boolean,
  onChange?: (...args: any[]) => void
}

export class Avatar extends Block<AvatarProps> {
  public static componentName = 'Avatar';

  constructor({ onChange, ...props }: AvatarProps) {
    super({
      ...props,
      avatar: props.avatar ? `${apiEndpoint}/resources${props.avatar}` : undefined,
      events: {
        change: onChange!,
      },
    });
  }

  protected render(): string {
    return `
    <form>
      <label for="{{ id }}" class="${styles.icon}">
        <img src="{{ avatar }}">
        {{#if edit}}
          <input type="file" name="{{ name }}" id="{{ id }}" hidden="true">
        {{/if}}
      </label>
    </form>
    `;
  }
}
