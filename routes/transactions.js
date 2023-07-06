// Required Packages
const express = require("express");

// Define Router
const router = express.Router();

// Transactions Controller
const TransactionsController = require("../controllers/TransactionsController");

// Authenticate Middleware
const authenticate = require("../middleware/authenticate");

// Check ID Middleware
const checkId = require("../middleware/checkId");

// @route GET api/transactions/
// @desc Get all transactions for a household
// @access Private
router.get(
   "/",
   authenticate,
   TransactionsController.getTransactionsForHousehold
);

// @route POST api/transactions/create
// @desc Create a transaction
// @access Private
router.post("/create", authenticate, TransactionsController.createTransaction);

// @route PUT api/transactions/:id
// @desc Update a transaction
// @access Private
router.put(
   "/:id",
   authenticate,
   checkId,
   TransactionsController.updateTransaction
);

// @route DELETE api/transactions/:id
// @desc Delete a transaction
// @access Private
router.delete(
   "/:id",
   authenticate,
   checkId,
   TransactionsController.deleteTransaction
);

// Export Router
module.exports = router;
