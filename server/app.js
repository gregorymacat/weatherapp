const express = require('express');
const path = require('path');
const morgan = require('morgan');

const PORT = 3000;
const app = express();

app.use(express.static('assets'));
app.use(express.static('public'));
app.use(morgan('tiny'));

const forecastRouter = require('./routes/forecasts');
const locationRouter = require('./routes/locations');

app.use('/forecasts', forecastRouter);
app.use('/suggestions', locationRouter);

app.listen(PORT, () => {
  console.log('App is listening on port: ', PORT);
})