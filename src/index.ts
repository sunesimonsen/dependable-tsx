export { render, clone } from "@dependable/view";

type VoidProps = {
  children?: void;
};

export abstract class Component<TProps = VoidProps> {
  props: TProps | undefined;
  abstract render(props: TProps): JSX.Nodes;
}
