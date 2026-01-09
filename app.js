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
app.get('/project/:id', (req, res, next) => {
  // Render a specific project based on ID
  const { id } = req.params;
  const project = projects.find(project => project.id === parseInt(id));

  if (project) {
    res.render('project', { project });
  } else {
    // If project with ID does not exist forward to 404 handler
    const err = new Error('Project not found');
    err.status = 404;
    next(err);
  }
});

// Error handling
// Prevent Chrome DevTools workspace requests from triggering 404 errors
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.status(204).end();
});

// 404 error handler
app.use((req, res, next) => {
  const err = new Error('Page not found');
  err.status = 404;
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  // Ensure error status and message properties exist
  err.status = err.status || 500;
  err.message = err.message || 'Unexpected server error';
  // Log error
  console.log(`${err.status} Error: ${err.message}`);
  // Set response status
  res.status(err.status).send(err.message);
});

// Start server on port 3000
app.listen(3000, () => {
  console.log('The application is listening on port 3000');
});