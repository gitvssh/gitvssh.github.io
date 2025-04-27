/* eslint-disable */
const withImages = require('next-images');
const { homepage } = require('./package.json');

const { NODE_ENV } = process.env;

module.exports = withImages({
  assetPrefix: '.',
});
// withCSS({
// webpack: config => {
//   config.resolve.alias['@'] = __dirname;
//   return config;
// }
// }),
