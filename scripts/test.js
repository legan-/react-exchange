require.extensions['.css'] = function () {
  return null;
};
require.extensions['.png'] = function () {
  return null;
};
require.extensions['.jpg'] = function () {
  return null;
};

require('@babel/register')();
require('raf/polyfill');
require('isomorphic-fetch');
require('jsdom-global')();