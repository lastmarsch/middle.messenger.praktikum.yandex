import routes from '../../const/routes';
import { Block, renderDOM } from '../../core';
import { IProps } from '../../core/Block';
import styles from './error.module.css';

interface ErrorProps extends IProps {
  code?: string,
  text?: string,
}

export default class ErrorPage extends Block<IProps> {
  constructor(props: ErrorProps) {
    const onClick = (props: IProps) => {
      if (props.href in routes) { renderDOM(routes[props.href]); }
    };

    super({ ...props, onClick });
  }

  protected render() {
    return `
    <div class="${styles['app-container']}">
      <div class="${styles.error}">
        <span class="${styles.error__title}">
          ${this.props.code}
          <br>
          ${this.props.text}
        </span>
        {{{ Link 
          href="/chat" 
          class="${styles.error__link}" 
          text="Back to chats" 
          onClick=onClick
        }}}
      </div>
    </div>`;
  }
}
