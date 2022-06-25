import { Block, renderDOM } from '../../core';
import { IProps } from '../../core/Block';
import styles from './home.module.css';
import * as paths from '../../data/routes.json';
import routes from '../../const/routes';

export default class HomePage extends Block<IProps> {
  constructor(props: IProps) {
    const onClick = (props: IProps) => {
      if (props.href in routes) { renderDOM(routes[props.href]); }
    };

    super({
      ...props,
      onClick,
    });
  }

  protected render() {
    let buffHtml = `
    <div class="${styles['app-container']}">
      <div class="${styles.routes}">
        <span class="${styles.routes__title}">
            Список страниц
        </span>`;

    Object.values(paths.pages).forEach((page) => {
      buffHtml += `
        {{{ Link 
          href="${page.href}"
          class="${styles.routes__link}" 
          text="${page.title}"
          onClick=onClick 
        }}}`;
    });
    buffHtml += '</div></div>';
    return buffHtml;
  }
}
