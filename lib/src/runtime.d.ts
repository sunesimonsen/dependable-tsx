declare type JSXProps = {
  children?: JSX.Node;
  [keyName: string]: any;
};
export declare const jsx: (
  type: string | JSX.ElementClass,
  props: JSXProps,
) => JSX.Nodes;
declare type JSXSProps = {
  children: JSX.Node[];
  [keyName: string]: any;
};
export declare const jsxs: (
  type: string | JSX.ElementClass,
  props: JSXSProps,
) => JSX.Nodes;
declare type FragmentProps = {
  children: JSX.Nodes;
};
export declare class Fragment {
  render(props: FragmentProps): JSX.Nodes;
}
declare global {
  namespace JSX {
    type IntrinsicElements = {
      [elemName: string]: any;
    } & {
      [K in keyof HTMLElementTagNameMap]: {
        children?: any;
      } & Omit<Partial<HTMLElementTagNameMap[K]>, "children">;
    };
    interface ElementClass {
      render(props?: any): Nodes;
    }
    type VElement = {
      type: ElementClass | string;
      props: Record<string, any>;
      children: Nodes;
    };
    type Node = string | null | undefined | VElement;
    type Nodes = Node | Node[];
    interface ElementAttributesProperty {
      props: any;
    }
    interface ElementChildrenAttribute {
      children: any;
    }
  }
}
export {};
