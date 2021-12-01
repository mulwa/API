const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transactionController')


//Get all transactions
router.get('/', transactionController.getAllTransaction)

//Get all transactions for user
router.get('/:id', transactionController.getTransactionForUser)

//Save transactions
router.post('/', transactionController.saveTransaction)

module.exports = router