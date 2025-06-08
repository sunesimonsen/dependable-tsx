export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  modulePathIgnorePatterns: ["<rootDir>/lib/"],
  moduleNameMapper: {
    "^@dependable/tsx$": "<rootDir>/src/index.ts",
    "^@dependable/tsx/jsx-runtime$": "<rootDir>/src/runtime.ts",
    "^@dependable/tsx/jsx-dev-runtime$": "<rootDir>/src/runtime.ts",
  },

  // Use babel-jest to transform files. Make sure you have the required Babel configuration.
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
  },
  // Normally Jest ignores node_modules. Override that for @dependable/view.
  transformIgnorePatterns: [],
  // Optionally, ensure your module file extensions include js, jsx, ts, and tsx
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
};
