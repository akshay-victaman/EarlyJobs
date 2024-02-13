'use strict';

const express = require('express');
const serverless = require('serverless-http');
const app = require('./app'); // Load your Express app

const server = serverless(app);

exports.handler = server.handler;
