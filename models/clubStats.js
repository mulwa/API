const mongoose = require("mongoose");
const ClubStatsSchema = mongoose.Schema({
  clubid: {
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

module.exports = mongoose.model("ClubStats", ClubStatsSchema);
