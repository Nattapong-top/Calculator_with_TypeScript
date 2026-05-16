export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': ['ts-jest', { useESM: true }]
    },
    modulePathIgnorePatterns: ["<rootDir>/dist/"],

    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    }
};