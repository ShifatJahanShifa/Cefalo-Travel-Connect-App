// const { createDefaultPreset } = require("ts-jest");

// const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  // testEnvironment: "node",
  // transform: {
  //   ...tsJestTransformCfg,
  // },

  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
  testPathIgnorePatterns: ['/dist/'],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",           // Include all TS files in src
    "!src/**/*.d.ts",        // Exclude type declarations
    "!src/**/index.ts",      // Optionally exclude barrel files
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"]
  // globals: {
  //   'ts-jest': {
  //     useESM: true
  //   },
  // },
};