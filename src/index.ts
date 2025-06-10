export abstract class Component<TProps = {}, TContext = null> {
  constructor(props: TProps, context: TContext) {
    this.props = props;
    this.context = context;
  }

  readonly props: TProps;
  readonly context: TContext;
  abstract render(props: TProps): JSX.Nodes;
}
