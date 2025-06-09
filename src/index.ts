export { render, clone } from "@dependable/view";

type VoidProps = {
  children?: void;
};

type Context = Record<string, any>;

export abstract class Component<TProps = VoidProps> {
  props: TProps | undefined;
  context: Context = {};
  abstract render(props: TProps): JSX.Nodes;
}
