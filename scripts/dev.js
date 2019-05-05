const { FuseBox, Sparky } = require('fuse-box');
const proxyServer = require('./proxy');
const { getPlugins } = require('./resources/fsbx-plugins');
require('dotenv').config();

// Sparky.src('assets/**/**.*', { base: '../src' }).dest('../build').exec();

const config = {
  homeDir: '../src',
  output: '../dist/$name.js',
  sourceMaps: true,
  target: 'browser',
  useTypescriptCompiler: true,
  allowSyntheticDefaultImports: true,
  log: {
    showBundledFiles: false, // Don't list all the bundled files every time we bundle
    clearTerminalOnBundle: true, // Clear the terminal window every time we bundle
  },
  plugins: getPlugins('dev'),
};

const fuse = FuseBox.init(config);
fuse.dev({ port: 5001, root: false }, server => proxyServer(server.httpServer.app));
fuse
  .bundle('app')
  .instructions('>index.jsx')
  .watch()
  .hmr();
fuse.run();
