type JSXProps = {
  children?: JSX.Node;
  [keyName: string]: any;
};

export const jsx = (
  type: string | JSX.ElementClass,
  props: JSXProps,
): JSX.Nodes => {
  const { children, ...propsWithoutChildren } = props;

  return { type, props: propsWithoutChildren, children: [children] };
};

type JSXSProps = {
  children: JSX.Node[];
  [keyName: string]: any;
};

export const jsxs = (
  type: string | JSX.ElementClass,
  props: JSXSProps,
): JSX.Nodes => {
  const { children, ...propsWithoutChildren } = props;

  return { type, props: propsWithoutChildren, children: children.flat() };
};

type FragmentProps = {
  children: JSX.Nodes;
};

export class Fragment {
  render(props: FragmentProps) {
    return props.children;
  }
}

// Extend the global JSX namespace so TypeScript understands JSX.
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

    export interface ElementAttributesProperty {
      props: any;
    }

    export interface ElementChildrenAttribute {
      children: any;
    }
  }
}
