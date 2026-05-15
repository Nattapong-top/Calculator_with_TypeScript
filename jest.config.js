export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': ['ts-jest', { useESM: true }]
    },
    modulePathIgnorePatterns: ["<rootDir>/dist/"] // เพิ่มบรรทัดนี้ครับป๋า
};