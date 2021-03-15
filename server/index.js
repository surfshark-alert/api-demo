require('../env.config.js');
const { readFileSync } = require('fs');
const { resolve: nodeResolve } = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const fetch = require('node-fetch');

const resolve = (...args) => nodeResolve(__dirname, ...args);
const app = express();
const port = process.env.ALERT_PORT;

const checkPasswordLimiter = rateLimit({
    windowMs: process.env.ALERT_RL_WINDOW,
    max: process.env.ALERT_RL_MAX,
    message: { code: 429, message: 'Too many requests from this IP, please try again after an hour' },
});

const html = readFileSync(resolve('../client/index.html')).toString();

app.use(express.static(resolve('../client/')));

app.get('/', (req, res) => {
    res.send(html);
});

app.get('/api/identity/pass/:passwordHash', checkPasswordLimiter, async (req, res) => {
    const { passwordHash } = req.params;
    fetch(`${process.env.ALERT_API_BASE}/latest/identity/pass/${passwordHash.substring(0, 5)}`, {
        headers: { 'x-api-key': `${process.env.ALERT_X_API_KEY}`, 'x-api-token': `${process.env.ALERT_X_API_TOKEN}` },
    })
        .then(response => response.json())
        .then(r => res.send(r))
        .catch(() => {
            res.send({ code: 0, message: 'Service is not available' });
        });
});

app.listen(port, () => {
    console.log(`Surfshark Alert demo server listenting at http://localhost:${port}`);
});
