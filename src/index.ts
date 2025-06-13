type Values = Record<string, any>;

/**
 * A user defined component
 *
 * @example
 *
 * ```js
 * class MyComponent implements Component {
 *   render({ color, children }) {
 *     return h("h1", style: { "background": "red" }, "In the red");
 *   }
 * }
 * ```
 */
export interface IComponent<
  TProps extends Values = {},
  TContext extends Values | null = null,
> {
  /**
   * Method returning the virtual DOM for the component
   *
   * @param props the properties for the component
   * @param context the rendering context
   * @returns the virtual DOM for the component
   */
  render?(props: TProps, context: TContext): JSX.Nodes;

  /**
   * Is invoked just before a component is mounted.
   *
   * This method is a good place to initialize any observables before the first
   * render.
   */
  willMount?(): void;

  /**
   * Is invoked immediately after a component is mounted.
   *
   * This method is a good place to set up any subscriptions. If you do that,
   * don’t forget to unsubscribe in willUnmount().
   */
  didMount?(): void;

  /**
   * Is invoked immediately before a component is unmounted and destroyed.
   *
   * Perform any necessary cleanup in this method, such as invalidating timers,
   * canceling network requests, or cleaning up any subscriptions that were
   * created in didMount().
   */
  willUnMount?(): void;

  /**
   * Use this as an opportunity to operate on the DOM when the component has
   * been updated.
   */
  didUpdate?(): void;

  /**
   * Is invoked after each render.
   *
   * This method is a good place to invoke loading of data, or operate on the rendered DOM.
   */
  didRender?(): void;

  /**
   * This lifecycle is invoked after an error has been thrown by a descendant component.
   *
   * @param error the error that was thrown.
   */
  didCatch?(error: Error): void;
}

export abstract class Component<
  TProps extends Values = {},
  TContext extends Values | null = null,
> implements IComponent<TProps, TContext>
{
  constructor(props: TProps, context: TContext) {
    this.props = props;
    this.context = context;
  }

  readonly props: TProps;
  readonly context: TContext;

  abstract render?(props: TProps, context: TContext): JSX.Nodes;
}

type PortalProps = {
  target?: HTMLElement;
  children: JSX.Nodes;
};

export class Portal extends Component<PortalProps> {
  render({ children, ...props }: PortalProps) {
    return { type: "Portal", props, children };
  }
}

type ContextProps = Record<string, any>;

export class Context extends Component<ContextProps> {
  render({ children, ...props }: ContextProps) {
    return { type: "Context", props, children };
  }
}
