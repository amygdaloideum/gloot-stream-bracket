const path = require('path');
const fetch = require('node-fetch');
const express = require('express');
require('dotenv').config();

const apiKeyMiddleware = (req, res, next) => {
  req.headers['X-API-KEY'] = process.env.GLL_API_KEY;
  req.headers['game-id'] = process.env.GAME_ID;
  req.headers.gameId = process.env.GAME_ID;
  return next();
};

const formatParams = params =>
  Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

const dist = path.resolve('./dist');

function devServer(app) {
  app.use(express.static(dist));

  app.get('/api/config', (req, res) => {
    const { ENV, AUTH_PORTAL_URL, AUTH_CLIENT_ID } = process.env;
    res.send(JSON.stringify({ ENV, AUTH_PORTAL_URL, AUTH_CLIENT_ID }));
  });

  app.get('/api/gettoken', async (req, res) => {
    const { code, redirectUri } = req.query;
    if (!code || !redirectUri || code === 'undefined') {
      return res.status(403).send();
    }
    const tokenRes = await fetch(`${process.env.AUTH_PORTAL_URL}/oauth2/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.AUTH_CLIENT_ID}:${process.env.AUTH_SECRET}`
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formatParams({
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code,
      }),
    });
    const json = await tokenRes.json();
    res.send(json);
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(dist, 'index.html'));
  });
}

module.exports = devServer;
