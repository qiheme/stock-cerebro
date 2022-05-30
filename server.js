const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3001;
const finnhub = require('finnhub');
const app = express();
const logger = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');

// Load up env variables
dotenv.config();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(compression());
app.use(logger('dev'));

app.use(express.static('public'));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/stock-cerebro',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

// Initiate Finnhub configuration
const finnbhubApiKey = finnhub.ApiClient.instance.authentications.api_key;
finnbhubApiKey.apiKey = process.env.FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api/finnhub/general', (req, res) => {
  finnhubClient.marketNews('general', {}, (error, data) => {
    console.log(data);
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

app.get('/api/finnhub/quote/:symbol', (req, res) => {
  finnhubClient.quote(req.params.symbol, (error, data) => {
    console.log(data);
    if (error) {
      res.send(error);
    } else {
      data.symbol = req.params.symbol;
      res.json(data);
    }
  });
});

// Send every request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
