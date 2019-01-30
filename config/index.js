module.exports = {
  name: 'Exchange',
  clientPort: process.env.CLIENT_PORT || 3000,
  buildPort: process.env.BUILD_PORT || 3001,
  host: process.env.HOST || 'localhost'
};