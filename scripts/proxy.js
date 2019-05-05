const path = require('path');
const express = require('express');
require('dotenv').config();

const dist = path.resolve('./dist');

function devServer(app) {
  app.use(express.static(dist));

  app.get('*', (req, res) => {
    res.sendFile(path.join(dist, 'index.html'));
  });
}

module.exports = devServer;
