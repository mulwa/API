const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  speakers: {
    type: Array,
  },
  allmoderators: {
    type: Array,
  },
  activemoderators: {
    type: Array,
  },
  raisedhands: {
    type: Array,
  },
  activeTime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
  },
  clubListIds: {
    type: Array,
  },
  clubListNames: {
    type: Array,
  },
  created_time: {
    type: Date,
    default: Date.now,
  },

  ownerid: {
    type: String,
  },
  currency: {
    type: String,
  },
  eventid: {
    type: String,
  },
  handsraisedby: {
    type: Number,
  },
  invitedfriends: {
    type: Array,
  },
  openToMembersOnly: {
    type: Boolean,
  },
  roomtype: {
    type: String,
  },
  speakerCount: {
    type: Number,
  },
  sponsors: {
    type: String,
  },
  title: {
    type: String,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("EndedRooms", roomSchema);
