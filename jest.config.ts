module.exports = {
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
  },
  transform: {
    '^.+\\.vue$': 'vue3-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
};
