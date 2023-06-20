export default {
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src/mappers/*.ts', '<rootDir>/src/utils/*.ts'],
  maxWorkers: '50%',
  rootDir: '..',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  transform: {
    '.*\\.ts$': ['@swc/jest'],
  },
  transformIgnorePatterns: [],
}
