/**
 * @type {import('prettier').Options}
 */
export default {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  jsxSingleQuote: false,
  singleQuote: false,
  arrowParens: "always",
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  tailwindFunctions: ["cn"],
  customFunctions: [
    //
    "cn",
    "cva",
  ],
  attributeGroups: [
    "^key$",
    "^class$",
    "^(id|name)$",
    "$DEFAULT",
    "^data-",
    "^aria-",
  ],
  attributeSort: "ASC",
  plugins: [
    "prettier-plugin-sort-json",
    "prettier-plugin-packagejson",
    "@xeonlink/prettier-plugin-organize-attributes",
    "prettier-plugin-multiline-arrays",
    "prettier-plugin-organize-imports",
    "prettier-plugin-brace-style",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-classnames",
    "prettier-plugin-merge",
  ],
};
