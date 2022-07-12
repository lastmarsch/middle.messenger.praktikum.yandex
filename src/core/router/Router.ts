import { IProps } from '../Block';
import Route from './Route';

export default class Router {
  private static __instance: Router;

  public routes: Route[] = [];

  public history: History = window.history;

  private _currentRoute : Route | null = null;

  constructor() {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    Router.__instance = this;
  }

  // use — регистрирует блок по пути в роут и возвращает себя —
  // чтобы можно было выстроить в цепочку;
  use(pathname: string, blockClass: any, props: IProps) {
    const route = new Route(pathname, blockClass, props);
    this.routes.push(route);
    return this;
  }

  // start — по событию onpopstate запускает приложение.
  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    });

    // window.oncha;

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  getRoute(pathname: string) {
    const router = this.routes.find((route) => route.match(pathname));
    return router || this.routes.find((route) => route.match('*'));
  }

  // go — переходит на нужный роут и отображает нужный блок;
  go(pathname: string) {
    this.history!.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  // back — возвращает в прошлое состояние и показывает блок, соответствующий тому состоянию;
  back() {
    this.history!.back();
  }

  // forward — переходит в следующие состояние и показывает соответствующий блок;
  forward() {
    this.history!.forward();
  }
}
