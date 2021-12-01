const transactionsModel = require('../models/transactionsModel')

//Get all transactions for user
exports.getTransactionForUser = async function (req, res) {
    try {
        const transactions = await transactionsModel.find({uid: req.params.id}).sort({date: 0});
        res.json(transactions)
        
    } catch (error) {
        res.status(404).send(error);
    }
}

//Get all transactions
exports.getAllTransaction = async function (req, res) {
    try {
        const transaction = await transactionsModel.find()
        res.json(transaction)
        
    } catch (error) {
        res.status(404).send(error);
    }
}

//Save transactions
exports.saveTransaction = async function (req, res) {
    const transaction = new transactionsModel(req.body)
    
    try{
        await transaction.save()
        res.json("Successfuly saved transaction")
    }

    catch(err){
        res.status(404).send(error);
    }
}