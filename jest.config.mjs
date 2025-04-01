export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.css$': 'jest-transform-stub',
    },
    transformIgnorePatterns: [
        'node_modules/(?!(@mui/material|some-other-library)/)',
    ],
    moduleNameMapper: {
        '\\.module\\.css$': 'identity-obj-proxy',
    },
};
