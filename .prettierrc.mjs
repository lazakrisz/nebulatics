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
  importOrder: [
    //
    "^server-only$",
    "^client-only$",
    "<THIRD_PARTY_MODULES>",
    "^@[^/]+/(.*)$",
    "^@/(.*)$",
    "<BUILTIN_MODULES>",
    "^[./]",
  ],
  importOrderParserPlugins: [
    //
    "typescript",
    "jsx",
    "decorators-legacy",
  ],
  importOrderTypeScriptVersion: "5.0.0",
  importOrderCaseSensitive: false,
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
    "prettier-plugin-jsdoc",
    "@xeonlink/prettier-plugin-organize-attributes",
    "prettier-plugin-multiline-arrays",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-brace-style",
    "prettier-plugin-classnames",
    // "prettier-plugin-organize-imports",
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-merge",
  ],
};
