const express = require('express');
const path = require('path');
const { projects } = require('./data.json')

const app = express();

// Middleware setup
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'public')));