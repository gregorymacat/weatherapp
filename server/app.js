const express = require('express');
const path = require('path');

const PORT = 3000;
const app = express();

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log('App is listening on port: ', PORT);
})