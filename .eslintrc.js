module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: ["react", "@typescript-eslint"],
    rules: {
        indent: [
            "error",
            4,
            { ignoredNodes: ["TemplateLiteral"] },
            { SwitchCase: "off" }
        ],
        semi: [2, "always"],
        "space-before-function-paren": ["error", "never"],
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        "comma-dangle": ["error", "only-multiline"],
        "no-use-before-define": "off",
        "multiline-ternary": ["error", "never"]
    }
};
