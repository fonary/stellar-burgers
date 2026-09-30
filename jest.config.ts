import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],

  moduleNameMapper: {
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@utils-types$': '<rootDir>/src/utils/types.ts',
    '^@slices$': '<rootDir>/src/services/slices/index.ts',
    '^@selectors$': '<rootDir>/src/services/selectors/index.ts',
    '^@components$': '<rootDir>/src/components/index.ts',
    '^@ui$': '<rootDir>/src/components/ui/index.ts',
    '^@pages$': '<rootDir>/src/pages/index.ts',
    '^@store$': '<rootDir>/src/services/store.ts',

    // CSS-модули — подменяем на пустой объект
    '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/styleMock.js',

    // Картинки и шрифты — подменяем на строку-заглушку
    '\\.(jpg|jpeg|png|gif|svg|woff|woff2|ttf)$':
      '<rootDir>/src/__mocks__/fileMock.js'
  },

  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}]
  },

  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8'
};

export default config;