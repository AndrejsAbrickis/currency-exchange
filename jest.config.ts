module.exports = {
  moduleFileExtensions: ["js","ts", "json", "vue"],
  transform: {
    '^.+\\.vue$': 'vue3-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
};
