module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
  setupFiles: ["./tests/setup.ts"],
  transformIgnorePatterns: [
    "/node_modules/(?!vue)",
    "/node_modules/@launcher/(?!vue-component-header|vue-component-datatable|utilities)",
  ],
  collectCoverage: false,
  collectCoverageFrom: ["**/*.{ts,vue}", "!**/node_modules/**"],
};