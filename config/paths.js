const path = require('path');

function resolve(relativePath) {
  return path.resolve(__dirname, relativePath);
}

module.exports = {
  root: resolve('..'),
  public: resolve('../public'),
  src: resolve('../src'),
  build: resolve('../build'),
  node_modules: resolve('../node_modules'),
};