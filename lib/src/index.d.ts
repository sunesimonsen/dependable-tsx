export { render, clone } from "@dependable/view";
declare type VoidProps = {
  children?: void;
};
export declare abstract class Component<TProps = VoidProps> {
  props: TProps | undefined;
  abstract render(props: TProps): JSX.Nodes;
}
