const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json('the api returned a result');
});

app.listen(5000, () => {
  console.log('express server Listening on port 5000');
});
