import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@dependable/tsx/jsx-runtime";
import { Component, render, clone } from "@dependable/tsx";
import { describe, beforeEach, it } from "@jest/globals";
class FancyHeading extends Component {
    render({ children }) {
        return _jsx("h1", { className: "fancy", children: children });
    }
}
class FancySection extends Component {
    render({ children }) {
        return _jsx("section", { className: "fancy", children: children });
    }
}
class FancyArticle extends Component {
    render({ children }) {
        return _jsx("article", { className: "fancy", children: children });
    }
}
class Add extends Component {
    render({ a, b }) {
        return (_jsxs("span", { children: [a, "+", b, "=", a + b] }));
    }
}
class ArrayChildren extends Component {
    render() {
        return [_jsx("h1", { children: "Testing" }), _jsx("p", { children: "This component returns an array of JSX" })];
    }
}
describe("jsx-runtime", () => {
    let container;
    beforeEach(() => {
        container = document.createElement("div");
    });
    it("allows rendering a native element without attributes", () => {
        render(_jsx("h1", { children: "Hello" }), container);
        expect(container.innerHTML).toEqual("<h1>Hello</h1>");
    });
    it("allows rendering a native element with attributes", () => {
        render(_jsx("h1", { title: "This is a hello message", children: "Hello" }), container);
        expect(container.innerHTML).toEqual('<h1 title="This is a hello message">Hello</h1>');
    });
    it("allows rendering a simple component", () => {
        render(_jsx(FancyHeading, { children: "Hello" }), container);
        expect(container.innerHTML).toEqual('<h1 class="fancy">Hello</h1>');
    });
    it("allows rendering a component with attributes", () => {
        render(_jsx(Add, { a: 12, b: 30 }), container);
        expect(container.innerHTML).toEqual("<span>12+30=42</span>");
    });
    it("allows rendering a fragment", () => {
        render(_jsxs(_Fragment, { children: [_jsx(FancyHeading, { children: "Hello" }), _jsx("p", { children: "This is just some text" })] }), container);
        expect(container.innerHTML).toEqual('<h1 class="fancy">Hello</h1><p>This is just some text</p>');
    });
    it("allows rendering native elements with multiple children", () => {
        render(_jsxs("section", { children: [_jsx("p", { children: "paragraph 1" }), _jsx("p", { children: "paragraph 2" })] }), container);
        expect(container.innerHTML).toEqual("<section><p>paragraph 1</p><p>paragraph 2</p></section>");
    });
    it("allows rendering components with multiple children", () => {
        render(_jsxs(FancySection, { children: [_jsx("p", { children: "paragraph 1" }), _jsx("p", { children: "paragraph 2" })] }), container);
        expect(container.innerHTML).toEqual('<section class="fancy"><p>paragraph 1</p><p>paragraph 2</p></section>');
    });
    it("allows rendering components with multiple nested components", () => {
        render(_jsxs(FancyArticle, { children: [_jsxs(FancySection, { children: [_jsx("p", { children: "paragraph 1" }), _jsx("p", { children: "paragraph 2" })] }), _jsxs(FancySection, { children: [_jsx("p", { children: "paragraph 1" }), _jsx("p", { children: "paragraph 2" })] })] }), container);
        expect(container.innerHTML).toEqual([
            '<article class="fancy">',
            '<section class="fancy"><p>paragraph 1</p><p>paragraph 2</p></section>',
            '<section class="fancy"><p>paragraph 1</p><p>paragraph 2</p></section>',
            "</article>",
        ].join(""));
    });
    it("allows components to returns arrays of nodes", () => {
        render(_jsx(ArrayChildren, {}), container);
        expect(container.innerHTML).toEqual("<h1>Testing</h1><p>This component returns an array of JSX</p>");
    });
    it("allows cloning", () => {
        render(clone(_jsx("h1", { children: "Hello" }), { props: { className: "fancy" } }), container);
        expect(container.innerHTML).toEqual('<h1 class="fancy">Hello</h1>');
    });
});
