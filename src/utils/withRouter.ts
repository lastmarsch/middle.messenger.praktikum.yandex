import { Block, IProps, Router } from '@core';

interface WithRouterProps extends IProps {
  router: Router
}

export default function withRouter<P extends WithRouterProps>(WrappedBlock: typeof Block<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, router: window.router });
    }
  } as Block<Omit<P, 'router'>>;
}
