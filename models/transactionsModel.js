const mongoose = require('mongoose')

const TransactionSchema = mongoose.Schema({
    uid: {
        type: String
    },
    
    amount:{
        type: String
    },
    otherUserId: {
        type: String
    },
    type: {
        type:String
    },
    reason: {
        type:String
    },
    date: {
        type: String
    },
})

module.exports = mongoose.model('transactions', TransactionSchema)