import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import EventBus from './EventBus';

export interface IProps {
  tagName ?: string,
  events ?: Record<string, () => void>,
  [prop: string]: any
}

interface IMeta {
  props: IProps
}

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(8);

  protected _element!: HTMLElement;

  private _eventBus: () => EventBus;

  private readonly _meta: IMeta;

  protected _props: IProps;

  protected state: any = {};

  protected children: Block[] = [];

  protected refs: { [key: string]: HTMLElement } = {};

  constructor(props: IProps = { }) {
    this._meta = {
      props,
    };

    this._props = this._makePropsProxy(props);
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
    const tagName = this._props.tagName || 'template';
    return document.createElement(tagName);
  }

  getContent() {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this._eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }
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

  private _componentDidUpdate(oldProps: IProps, newProps: IProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) { this._eventBus().emit(Block.EVENTS.FLOW_RENDER); }
  }

  // For override
  // eslint-disable-next-line class-methods-use-this
  componentDidUpdate(oldProps: IProps, newProps: IProps) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(newProps)) {
      if (newProps[key] !== oldProps[key]) {
        return true;
      }
    }

    return false;
  }

  setProps = (nextProps: IProps) => {
    if (!nextProps) {
      return;
    }

    const prevProps = { ...this._props };
    Object.assign(this._props, nextProps);
    this._eventBus().emit(Block.EVENTS.FLOW_CDU, prevProps, this._props);
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

    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({
      ...this._props,
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

    const { events } = this._props as IProps;

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

    const { events } = this._props as IProps;

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
  private _makePropsProxy(props: IProps) {
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
        target[prop] = value;
        return true;
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      deleteProperty(target, prop: string) {
        throw new Error('Нет прав');
      },
      ownKeys(target) {
        return Object.keys(target).filter((key) => key.indexOf('_') !== 0);
      },
    });
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
