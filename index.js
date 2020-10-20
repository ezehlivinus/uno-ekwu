const express = require('express');
require('express-async-errors');

const start = require('./start/kernel');

const app = express();

start(app);

module.exports = app;
