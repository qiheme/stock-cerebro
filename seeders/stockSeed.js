const mongoose = require("mongoose");
const db = require("../models");
const finnhub = require("finnhub");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/stock-cerebro",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  }
);

// Initiate Finnhub configuration
const finnbhubApiKey = finnhub.ApiClient.instance.authentications.api_key;
finnbhubApiKey.apiKey = process.env.FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi();

finnhubClient.stockSymbols("US", (error, data) => {
  console.log(data);
  db.Stock.deleteMany({})
    .then(() => db.Stock.collection.insertMany(data))
    .then((data) => {
      console.log(data.result.n + " records inserted!");
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
});
