const express = require('express');
const app = express();

app.get('/api/cards', (req, res) => {
  res.json({ message: 'hi' });
});

app.listen(5000, () => {
  console.log('express server Listening on port 5000');
});
