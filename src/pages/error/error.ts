import { Block, IProps } from '../../core';
import { withRouter } from '../../utils';
import styles from './error.module.css';

export interface ErrorProps extends IProps {
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
    <div class="${styles.appContainer}">
      <div class="${styles.error}">
        <span class="${(styles as any).error__title}">
          ${this.props.code}
          <br>
          ${this.props.text}
        </span>
        {{{ Link 
          href="" 
          class="${(styles as any).error__link}" 
          text="Back to chats" 
          onClick=goToMessenger
        }}}
      </div>
    </div>`;
  }
}

export default withRouter(ErrorPage as any);
