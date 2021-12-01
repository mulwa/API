const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  clubid: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  imageurl: {
    type: String,
    default: "",
  },
  invited: {
    type: Array,
  },
  ownerid: {
    type: String,
  },
  allowfollowers: {
    type: Boolean,
    default: false,
  },
  allowmemberstohostrooms: {
    type: Boolean,
    default: false,
  },
  allowmembersviewwallet: {
    type: Boolean,
    default: false,
  },
  membercanstartrooms: {
    type: Boolean,
    default: false,
  },
  membersprivate: {
    type: Boolean,
    default: false,
  },
  publisheddate: {
    type: String,
    default: null,
  },
  gcbalance: {
    type: Number,
    default: 0.0,
  },
  topics: {
    type: Array,
  },
  members: {
    type: Array,
  },
  followers: {
    type: Array,
  },
  rooms: {
    type: Array,
  },
});

module.exports = mongoose.model("clubs", clubSchema);
