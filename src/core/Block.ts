import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import EventBus from './EventBus';

export interface IProps {
  tagName ?: string,
  events ?: Record<string, (...args: any[]) => void>,
  [prop: string]: any
}

export class Block<Props extends IProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public static componentName?: string;

  public id = nanoid(8);

  protected _element!: HTMLElement;

  private _eventBus: () => EventBus;

  public props: Props;

  protected state: any = {};

  protected children: Block<Props>[] = [];

  protected refs: { [key: string]: HTMLElement } = {};

  constructor(props: Props) {
    this.props = this._makePropsProxy(props ?? {});
    this.state = this._makePropsProxy(this.state);

    const eventBus = new EventBus();
    this._eventBus = () => eventBus;
    this._registerEvents(eventBus);
    this._eventBus().emit(Block.EVENTS.INIT);
  }

  init() {
    this._createResources();
    this.dispatchComponentDidMount();
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    this._element = this._createDocumentElement();
  }

  private _createDocumentElement() {
    const tagName = this.props.tagName || 'template';
    return document.createElement(tagName);
  }

  getContent() {
    return this.element;
  }

  private _componentDidMount() {
    this.componentDidMount();
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // For override
  // eslint-disable-next-line class-methods-use-this
  componentDidMount() { }

  dispatchComponentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) { this._eventBus().emit(Block.EVENTS.FLOW_RENDER); }
  }

  // For override
  // eslint-disable-next-line class-methods-use-this
  componentDidUpdate(oldProps: Props, newProps: Props) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(newProps)) {
      if (newProps[key] !== oldProps[key]) {
        return true;
      }
    }

    return false;
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    const prevProps = { ...this.props };
    Object.assign(this.props, nextProps);
    this._eventBus().emit(Block.EVENTS.FLOW_CDU, prevProps, this.props);
  };

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this._compile();

    this._removeEvents();
    const newElement = fragment.firstElementChild!;

    this._element!.replaceWith(newElement);

    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  // For override
  // eslint-disable-next-line class-methods-use-this
  protected render(): string {
    return '';
  }

  private _compile(): DocumentFragment {
    const fragment = document.createElement('template');

    // remove elements that are not in DOM
    this.children = this.children.filter((child) => document.body.contains(child.element));

    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({
      ...this.props,
      ...this.state,
      children: this.children,
      refs: this.refs,
    });

    Object.entries(this.children).forEach(([id, component]) => {
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);
      if (!stub) {
        return;
      }

      const stubChilds = stub.childNodes.length ? stub.childNodes : [];

      const content = component.getContent();
      stub.replaceWith(content);

      const layoutContent = content.querySelector('[data-layout="1"]');
      if (layoutContent && stubChilds.length) {
        layoutContent.append(...stubChilds);
      }
    });

    return fragment.content;
  }

  private _addEvents() {
    this.addEvents();

    const { events } = this.props as Props;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element.addEventListener(event, listener);
    });
  }

  // For override
  // eslint-disable-next-line class-methods-use-this
  protected addEvents() {}

  private _removeEvents() {
    this.removeEvents();

    const { events } = this.props as Props;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element.removeEventListener(event, listener);
    });
  }

  // For override
  // eslint-disable-next-line class-methods-use-this
  protected removeEvents() {}

  // eslint-disable-next-line class-methods-use-this
  private _makePropsProxy(props: Props) {
    return new Proxy(props, {
      get(target, prop: string) {
        if (prop.indexOf('_') === 0) {
          throw new Error('Нет прав');
        }
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        if (prop.indexOf('_') === 0) {
          throw new Error('Нет прав');
        }
        // eslint-disable-next-line no-param-reassign
        target[prop as keyof Props] = value;
        return true;
      },
      deleteProperty() {
        throw new Error('Нет прав');
      },
      ownKeys(target) {
        return Object.keys(target).filter((key) => key.indexOf('_') !== 0);
      },
    });
  }

  show() {
    this.getContent().style.display = 'flex';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
