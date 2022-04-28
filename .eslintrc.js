module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  plugins: ["@typescript-eslint", "prettier", "unicorn", "import", "more"],
  extends: [
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:unicorn/recommended",
    "plugin:prettier/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  ignorePatterns: ["**/*.html", "**/*.jpeg", "**/*.jpg", "**/*.png", "**/*.gif"],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    project: "./tsconfig.eslint.json",
  },
  env: {
    es6: true,
    browser: false,
    node: true,
  },
  rules: {
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    "unicorn/filename-case": ["error", { cases: { pascalCase: true, camelCase: true } }],
    "import/no-cycle": "off",
    "unicorn/no-null": "off",
    "func-names": ["warn", "as-needed"],
    "unicorn/no-nested-ternary": "off",
    "no-restricted-syntax": [
      "error",
      {
        selector: "ForInStatement",
        message:
          "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
      },
      {
        selector: "LabeledStatement",
        message:
          "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
      },
      {
        selector: "WithStatement",
        message:
          "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "more/no-then": "warn",
    curly: "warn",
  },
};
