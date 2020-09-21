const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stockSchema = new Schema(
  {
    description: {
      type: String,
      default: ""
    },
    displaySymbol: {
      type: String,
      default: ""
    },
    symbol: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    currency: {
      type: String,
      default: ""
    }
  },
  {
    toJSON: {
      // include any virtual properties when data is requested
      virtuals: true
    }
  }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
