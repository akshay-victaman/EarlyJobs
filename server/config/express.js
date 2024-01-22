// config/express.js
const express = require('express');
const app = express();

// Example middleware
app.use(express.json());

module.exports = app;
