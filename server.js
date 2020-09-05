const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3001;
const finnhub = require('finnhub');
const app = express();

// Load up env variables
dotenv.config();
 
// Initiate Finnhub configuration
const finnbhubApiKey = finnhub.ApiClient.instance.authentications['api_key'];
finnbhubApiKey.apiKey = process.env.FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi()
 
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/api/finnhub/general", function(req, res) {
  finnhubClient.generalNews("general", {}, (error, data, response) => {
    console.log(data)
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

app.get("/api/finnhub/quote/:symbol", function(req, res) {
  finnhubClient.quote(req.params.symbol, (error, data, response) => {
    console.log(data)
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
