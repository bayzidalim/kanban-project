const path = require('path'); // Make sure to require the 'path' module

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    // Add alias to the 'app' folder using the 'path' module
    config.resolve.alias['@'] = path.resolve(__dirname, 'app');
    return config;
  },
};
