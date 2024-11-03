// Import Required Modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Initialize the Express Application
const app = express();
const port = process.env.PORT || 3000;

// Middleware to Parse from Data
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for Logging Requests using Morgan
app.use(morgan('combined'));

// Serve Static Files
app.use(express.static('public'));

// Handle Form Submission
app.post('/submit-form', (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log(
    `Received submission: Name - ${name}, Email - ${email}, Subject - ${subject}, Message - ${message}`
  );

  // Add my own validation or database logic here
  res.json({ success: true, message: 'Form submitted successfully!' });
});

// Custom Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Additional Routes
app.get('/another-route', (req, res) => {
  res.send('This is another route'); 
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
}); 
