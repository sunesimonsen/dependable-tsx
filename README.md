# @dependable/tsx

Create VDom for
[@dependable/view](https://github.com/sunesimonsen/dependable-view) using
[TypeScript JSX](https://www.typescriptlang.org/docs/handbook/jsx.html).

## Install

```sh
# npm
npm install --save @dependable/tsx

# yarn
yarn add @dependable/tsx
```

## Usage

You can create VDom for a UI component using
[TypeScript JSX](https://www.typescriptlang.org/docs/handbook/jsx.html) and render it in the document body.

```tsx
import { render, Component } from "@dependable/tsx";

type ColorItProps = {
  color: string;
  children: JSX.Nodes;
}

class ColorIt extends Component<ColorItProps> {
  render({ color, children }: ColorItProps) {
    return <span style={ color }>{children}</span>;
  }
}

render(<ColorIt color="blueviolet">I'm colored</ColorIt>`);
```

## License

MIT License

Copyright (c) 2025 Sune Simonsen sune@we-knowhow.dk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
