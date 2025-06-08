export const jsx = (type, props) => {
    const { children, ...propsWithoutChildren } = props;
    return { type, props: propsWithoutChildren, children: [children] };
};
export const jsxs = (type, props) => {
    const { children, ...propsWithoutChildren } = props;
    return { type, props: propsWithoutChildren, children: children.flat() };
};
export class Fragment {
    render(props) {
        return props.children;
    }
}
