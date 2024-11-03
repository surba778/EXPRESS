// app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for logging all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Route-specific middleware for authentication
const checkAuth = (req, res, next) => {
  const isAuthenticated = req.headers.authorization === 'Bearer mysecrettoken';
  
  if (isAuthenticated) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized access' });
  }
};

// Public route - no authentication required
app.get('/', (req, res) => {
  res.send('Welcome to the public route!');
});

// Protected route - requires authentication
app.get('/protected', checkAuth, (req, res) => {
  res.send('Welcome to the protected route!');
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
