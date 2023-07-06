// Required Packages
const express = require("express");

// Define Router
const router = express.Router();

// Bank Accounts Controller
const BankAccountsController = require("../controllers/BankAccountsController");

// Authenticate Middleware
const authenticate = require("../middleware/authenticate");

// Check ID Middleware
const checkId = require("../middleware/checkId");

// @route GET api/bankaccounts
// @desc Get all bank accounts
// @access Private
router.get("/", authenticate, BankAccountsController.getAll);

// @route GET api/bankaccounts/:id
// @desc Get bank account by ID
// @access Private
router.get("/:id", authenticate, checkId, BankAccountsController.getById);

// @route POST api/bankaccounts/create
// @desc Create bank account
// @access Private
router.post("/create", authenticate, BankAccountsController.createBankAccount);

// @route PUT api/bankaccounts/:id/link
// @desc Link bank account to household
// @access Private
router.put(
   "/:id/link",
   authenticate,
   checkId,
   BankAccountsController.linkBankAccount
);

// @route PUT api/bankaccounts/:id
// @desc Edit bank account
// @access Private
router.put(
   "/:id",
   authenticate,
   checkId,
   BankAccountsController.updateBankAccount
);

// @route DELETE api/bankaccounts/:id
// @desc Delete bank account
// @access Private
router.delete(
   "/:id",
   authenticate,
   checkId,
   BankAccountsController.deleteBankAccount
);

// Export Router
module.exports = router;
