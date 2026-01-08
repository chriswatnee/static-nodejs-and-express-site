const express = require('express');
const path = require('path');
const { projects } = require('./data.json')

const app = express();

// Middleware setup
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'public')));

// Routes
// Index route
app.get('/', (req, res) => {
  // Render homepage with project data
  res.render('index', { projects });
});

// About route
app.get('/about', (req, res) => {
  // Render about page
  res.render('about');
});

// Dynamic project route
app.get('/project/:id', (req, res) => {
  // Render a specific project based on ID
  const { id } = req.params;
  const project = projects.find(project => project.id === parseInt(id));
  res.render('project', { project });
});

// Start server on port 3000
app.listen(3000, () => {
  console.log('The application is listening on port 3000');
});