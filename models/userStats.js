const mongoose = require("mongoose");
const UserStatsSchema = mongoose.Schema({
  userid: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  action: String,
  number: Number,
  type: String,
});

module.exports = mongoose.model("UserStats", UserStatsSchema);
