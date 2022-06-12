import Handlebars, { HelperOptions } from 'handlebars';
import Block from './Block';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface BlockConstructable<Props = any> {
  componentName: string,
  new(props: Props): Block
}

export default function registerComponent<Props extends any>(Component: BlockConstructable) {
  Handlebars.registerHelper(
    Component.componentName,
    // eslint-disable-next-line func-names
    function (this: Props, { hash: { ref, ...hash }, data, fn }: HelperOptions) {
      if (!data.root.children) {
        // eslint-disable-next-line no-param-reassign
        data.root.children = {};
      }

      if (!data.root.refs) {
        // eslint-disable-next-line no-param-reassign
        data.root.refs = {};
      }

      const { children, refs } = data.root;

      (Object.keys(hash) as any).forEach((key: keyof Props) => {
        if (this[key]) {
          // eslint-disable-next-line no-param-reassign
          hash[key] = hash[key].replace(new RegExp(`{{${String(key)}}}`, 'i'), this[key]);
        }
      });

      const component = new Component(hash);

      children[component.id] = component;

      if (ref) {
        refs[ref] = component.getContent();
      }

      const contents = fn ? fn(this) : '';

      return `<div data-id="${component.id}">${contents}</div>`;
    },
  );
}
