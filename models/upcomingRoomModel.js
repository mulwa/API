const mongoose = require('mongoose');

const upcomingroomSchema = new mongoose.Schema({
    amount: {
        type: Number
    },
    clubListIds: {
        type: Array
    },
    clubListNames: {
        type: Array
    },
    clubid: {
        type: String
    },
    clubname: {
        type: String
    },
    description: {
        type: String
    },
    eventdatetimestamp: {
        type: Number
    },
    eventtimetimestamp: {
        type: Number
    },
    openToMembersOnly: {
        type: Boolean
    },
    private: {
        type: Boolean
    },
    published_date: {
        type: String, default: Date.now
    },
    sponsors: {
        type: String
    },
    status: {
        type: String
    },
    title: {
        type: String
    },
    tobenotifiedusers: {
        type: Array
    },
    userid: {
        type: String
    },
    users: {
        type: Array
    }
});

module.exports =  mongoose.model("UpcomingRooms", upcomingroomSchema);

