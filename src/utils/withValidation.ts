import { Input } from '../components';
import { Block, IProps } from '../core';

interface WithValidationProps extends IProps {
  validateInput: (...args: any[]) => void,
  validate: (...args: any[]) => void
}

function withValidation<P extends WithValidationProps>(WrappedBlock: typeof Block<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      const validateInput = (self: Input) => {
        const input = document.querySelector(`#${self.props.id}`) as HTMLInputElement;
        if (!input && !self.props.regexp) { return false; }

        const text = input.value;
        const isValid = RegExp(self.props.regexp!).test(text);

        if (isValid) { self._element.classList.remove(`${self.props.invalidClassName}`); } else { self._element.classList.add(`${self.props.invalidClassName}`); }

        return isValid;
      };

      const validate = (form: HTMLFormElement) => {
        const data = Object.fromEntries(new FormData(form));

        let isValid = true;
        (Object.values(this.children) as unknown as Input[]).forEach((child) => {
          if (!document.body.contains(child.element)
        || !(child.props.id! in data)) { return; }

          const childValidity = validateInput(child);
          isValid = isValid && childValidity;
        });

        if (isValid) { return Promise.resolve(data); } return Promise.reject(new Error('The form is not valid'));
      };

      super({ ...props, validate, validateInput });
    }
  } as Block<Omit<P, 'validate' | 'validateInput'>>;
}

export default withValidation;
