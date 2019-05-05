const {
  WebIndexPlugin,
  QuantumPlugin,
  CSSPlugin,
  JSONPlugin,
  CSSResourcePlugin,
  ImageBase64Plugin,
} = require('fuse-box');
const packageJson = require('../../package.json');
const git = require('git-rev-sync');

const formatDate = date =>
  `${date.getFullYear()}/${date
    .getMonth()
    .toString()
    .padStart(2, 0)}/${date
    .getDate()
    .toString()
    .padStart(2, 0)} ${date.getHours()}:${date.getMinutes()}`;

const getPlugins = env => [
  ImageBase64Plugin({ useDefault: true }),
  [CSSResourcePlugin({ dist: '../dist/css-resources' }), CSSPlugin()],
  JSONPlugin(),
  WebIndexPlugin({ template: `../src/index.html` }),
  env === 'production' && QuantumPlugin({ uglify: true }),
];

module.exports = { getPlugins };
