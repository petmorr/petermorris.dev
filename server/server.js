const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
module.exports = app; // Export the app for testing purposes