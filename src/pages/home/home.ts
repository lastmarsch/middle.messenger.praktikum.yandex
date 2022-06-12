import { Block } from '../../core';
import styles from './home.module.css';
import * as routes from '../../data/routes.json';

export default class HomePage extends Block {
  protected render() {
    let buffHtml = `
    <div class="${styles['app-container']}">
      <div class="${styles.routes}">
        <span class="${styles.routes__title}">
            Список страниц
        </span>`;

    Object.values(routes.pages).forEach((page) => {
      buffHtml += `
        {{{ Link 
          href="${page.href}"
          class="${styles.routes__link}" 
          text="${page.title}" 
        }}}`;
    });
    buffHtml += '</div></div>';
    return buffHtml;
  }
}
