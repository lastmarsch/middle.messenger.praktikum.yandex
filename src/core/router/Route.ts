import { Block, IProps } from '../Block';
import render from '../render';

export default class Route {
  private _pathname;

  private _blockClass;

  private _block: Block<IProps> | null;

  private _props;

  constructor(pathname: string, view: typeof Block<IProps>, props: IProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    this._block!.hide();
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
      render(this._block);
      return;
    }
    this._block.show();
    render(this._block);
  }
}
