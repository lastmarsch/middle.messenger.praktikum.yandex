import { Block, IProps } from '../../core';
import { withRouter } from '../../utils';
import styles from './error.module.css';

interface ErrorProps extends IProps {
  code?: string,
  text?: string,
}

class ErrorPage extends Block<IProps> {
  constructor(props: ErrorProps) {
    super({
      ...props,
      goToMessenger: () => this.props.router.go('/messenger'),
    });
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
          href="" 
          class="${styles.error__link}" 
          text="Back to chats" 
          onClick=goToMessenger
        }}}
      </div>
    </div>`;
  }
}

export default withRouter(ErrorPage);
