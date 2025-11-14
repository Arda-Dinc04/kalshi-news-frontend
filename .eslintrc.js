module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    "react-native/react-native": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "react-native"],
  rules: {
    "react/prop-types": "off",
    "no-unused-vars": "warn",
    "react/display-name": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

