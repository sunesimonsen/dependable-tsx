import { Component } from "@dependable/tsx";
import { render, clone } from "@dependable/view";
import { describe, beforeEach, it } from "@jest/globals";

type FancyHeadingProps = {
  children: string;
};

class FancyHeading extends Component<FancyHeadingProps> {
  render({ children }: FancyHeadingProps): JSX.Nodes {
    return <h1 className="fancy">{children}</h1>;
  }
}

type FancySectionProps = {
  children: JSX.Nodes;
};

class FancySection extends Component<FancySectionProps> {
  render({ children }: FancySectionProps): JSX.Node {
    return <section className="fancy">{children}</section>;
  }
}

type FancyArticleProps = {
  children: JSX.Nodes;
};

class FancyArticle extends Component<FancyArticleProps> {
  render({ children }: FancyArticleProps): JSX.Node {
    return <article className="fancy">{children}</article>;
  }
}

type AddProps = {
  a: number;
  b: number;
};

class Add extends Component<AddProps> {
  render({ a, b }: AddProps): JSX.Node {
    return (
      <span>
        {a}+{b}={a + b}
      </span>
    );
  }
}

class ArrayChildren extends Component {
  render(): JSX.Nodes {
    return [<h1>Testing</h1>, <p>This component returns an array of JSX</p>];
  }
}

type Context = { message: string };

class ContextPrinter extends Component<{}, Context> {
  render() {
    return <p>{this.context.message}</p>;
  }
}

class ClassNameProducer {
  toString() {
    return "generated";
  }
}

class NoChildren extends Component {
  render() {
    return <h1>Hello</h1>;
  }
}

describe("jsx-runtime", () => {
  let container: Element;

  beforeEach(() => {
    container = document.createElement("div");
  });

  it("allows rendering a native element without attributes", () => {
    render(<h1>Hello</h1>, container);

    expect(container.innerHTML).toEqual("<h1>Hello</h1>");
  });

  it("allows rendering a native element with attributes", () => {
    render(<h1 title="This is a hello message">Hello</h1>, container);

    expect(container.innerHTML).toEqual(
      '<h1 title="This is a hello message">Hello</h1>',
    );
  });

  it("allows rendering an element children and without attributes", () => {
    render(<NoChildren />, container);

    expect(container.innerHTML).toEqual("<h1>Hello</h1>");
  });

  it("allows rendering a simple component", () => {
    render(<FancyHeading>Hello</FancyHeading>, container);

    expect(container.innerHTML).toEqual('<h1 class="fancy">Hello</h1>');
  });

  it("allows rendering a component with attributes", () => {
    render(<Add a={12} b={30} />, container);

    expect(container.innerHTML).toEqual("<span>12+30=42</span>");
  });

  it("allows rendering a fragment", () => {
    render(
      <>
        <FancyHeading>Hello</FancyHeading>
        <p>This is just some text</p>
      </>,
      container,
    );

    expect(container.innerHTML).toEqual(
      '<h1 class="fancy">Hello</h1><p>This is just some text</p>',
    );
  });

  it("allows rendering native elements with multiple children", () => {
    render(
      <section>
        <p>paragraph 1</p>
        <p>paragraph 2</p>
      </section>,
      container,
    );

    expect(container.innerHTML).toEqual(
      "<section><p>paragraph 1</p><p>paragraph 2</p></section>",
    );
  });

  it("allows rendering components with multiple children", () => {
    render(
      <FancySection>
        <p>paragraph 1</p>
        <p>paragraph 2</p>
      </FancySection>,
      container,
    );

    expect(container.innerHTML).toEqual(
      '<section class="fancy"><p>paragraph 1</p><p>paragraph 2</p></section>',
    );
  });

  it("allows rendering components with multiple nested components", () => {
    render(
      <FancyArticle>
        <FancySection>
          <p>paragraph 1</p>
          <p>paragraph 2</p>
        </FancySection>
        <FancySection>
          <p>paragraph 1</p>
          <p>paragraph 2</p>
        </FancySection>
      </FancyArticle>,
      container,
    );

    expect(container.innerHTML).toEqual(
      [
        '<article class="fancy">',
        '<section class="fancy"><p>paragraph 1</p><p>paragraph 2</p></section>',
        '<section class="fancy"><p>paragraph 1</p><p>paragraph 2</p></section>',
        "</article>",
      ].join(""),
    );
  });

  it("allows components to returns arrays of nodes", () => {
    render(<ArrayChildren />, container);

    expect(container.innerHTML).toEqual(
      "<h1>Testing</h1><p>This component returns an array of JSX</p>",
    );
  });

  it("allows event handlers on primitive elements", () => {
    render(
      <button onclick={() => console.log("wat")}>Click me</button>,
      container,
    );

    expect(container.innerHTML).toEqual("<button>Click me</button>");
  });

  it("allows components that uses the context", () => {
    render(<ContextPrinter />, container, { message: "Hello from context" });

    expect(container.innerHTML).toEqual("<p>Hello from context</p>");
  });

  it("allows stringable values for className attributes", () => {
    render(<h1 className={new ClassNameProducer()}>Hello</h1>, container);

    expect(container.innerHTML).toEqual('<h1 class="generated">Hello</h1>');
  });

  it("allows stringable values for class attributes", () => {
    render(<h1 class={new ClassNameProducer()}>Hello</h1>, container);

    expect(container.innerHTML).toEqual('<h1 class="generated">Hello</h1>');
  });

  it("allows cloning", () => {
    render(clone(<h1>Hello</h1>, { props: { className: "fancy" } }), container);

    expect(container.innerHTML).toEqual('<h1 class="fancy">Hello</h1>');
  });
});
