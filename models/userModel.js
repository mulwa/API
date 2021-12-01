const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({

    lastname: {
        type: String,
        required: true
    },
    clubs: {
        type: Array,
    },
    joinedclubs: {
        type: Array
    },
    blocked: {
        type: Array,
    },
    subothernot: {
        type: Boolean,
        default: false
    },
    sendfewernotifications: {
        type: Boolean,
        default: false
    },
    pausenotifications: {
        type: Boolean,
        default: false
    },
    pausedtime: {
        type: Number,
        default: null
    },
    subtrend: {
        type: Boolean,
        default: false
    },
    subroomtopic: {
        type: Boolean,
        default: false
    },
    accountstatus: {
        type: Boolean,
        default: true
    },
    interests: {
        type: Array,
    },
    membership: {
        type: Number,
        default: null
    },
    membersince: {
        type: Number,
    },
    firstname: {
        type: String,
    },
    contactsinvited: {
        type: String,
    },
    activeroom: {
        type: String,
    },
    callerid: {
        type: Number,
        default: 0
    },
    paidrooms: {
        type: Array,
    },
    mbalance: {
        type: Number,
        default: 0.0
    },
    gcbalance: {
        type: Number,
        default: 0.0
    },
    valume: {
        type: Number,
        default: 0
    },
    callmute: {
        type: Boolean,
        default: false
    },
    online: {
        type: Boolean,
        default: false
    },
    username: {
        type: String,
    },
    countrycode: {
        type: String,
    },
    firebasetoken: {
        type: String,
    },
    usertype: {
        type: String,
    },
    uid: {
        type: String,
    },
    referrerid: {
        type: String,
        default: null
    },
    moderator: {
        type: String,
        default: false
    },
    bio: {
        type: String,
    },
    countryname: {
        type: String,
    },
    phonenumber: {
        type: String,
    },
    imageurl: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    lastAccessTime: {
        type: Number,
    },
    followers: {
        type: Array,
    },
    following: {
        type: Array,
    },
    isNewUser: {
        type: Boolean,
        default: true
    },
    email: {
      type: String,
    },
  renewUpgrade: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
