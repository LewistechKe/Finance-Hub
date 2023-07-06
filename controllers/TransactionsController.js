// Bank Account Model
const BankAccount = require("../models/bankaccount");

// Validation Function
const { validateTransactionInput } = require("../validation/transactions");

// Get Transactions For Household
const getTransactionsForHousehold = async (req, res) => {
   if (!req.query.householdId) {
      return res
         .status(400)
         .json({ errors: { household: "Must provide a household id" } });
   }

   const bankAccounts = await BankAccount.find({
      linkedTo: req.query.householdId,
   });

   if (!bankAccounts) {
      return res.json([]);
   }

   const transactions = bankAccounts.map((account) => account.transactions);

   res.json(transactions.flat());
};

// Create a transaction
const createTransaction = async (req, res) => {
   const { errors, isValid } = validateTransactionInput(req.body);

   if (!isValid) {
      return res.status(400).json({ errors });
   }

   const bankAccount = await BankAccount.findById(req.body.bankId);

   if (!bankAccount) {
      return res
         .status(404)
         .json({ errors: { account: "No bank account with that id." } });
   }

   if (bankAccount.userId !== req.user._id) {
      return res.status(400).json({
         errors: {
            user: "You dont own the bank account you wish to make changes to.",
         },
      });
   }

   bankAccount.transactions.push({
      type: req.body.type,
      memo: req.body.memo,
      amount: parseInt(req.body.amount),
   });

   try {
      await bankAccount.save();
      return res.json(bankAccount);
   } catch (err) {
      return res.status(500).json({
         errors: { server: "An error occured. Try again later." },
      });
   }
};

// Edit Transaction
const updateTransaction = async (req, res) => {
   const { errors, isValid } = validateTransactionInput(req.body);

   if (!isValid) {
      return res.status(400).json({ errors });
   }

   const bankAccount = await BankAccount.findById(req.body.bankId);

   if (!bankAccount) {
      return res
         .status(404)
         .json({ errors: { account: "No bank account with that id." } });
   }

   if (bankAccount.userId !== req.user._id) {
      return res.status(400).json({
         errors: {
            user: "You dont own the bank account you wish to make changes to.",
         },
      });
   }

   const transactionIndex = bankAccount.transactions.findIndex(
      (transaction) => transaction._id == req.params.id
   );

   bankAccount.transactions[transactionIndex].type = req.body.type;
   bankAccount.transactions[transactionIndex].memo = req.body.memo;
   bankAccount.transactions[transactionIndex].amount = parseInt(
      req.body.amount
   );

   try {
      await bankAccount.save();
      res.json(bankAccount);
   } catch (err) {
      return res.status(500).json({
         errors: { server: "An error occured. Try again later." },
      });
   }
};

// Delete Transaction
const deleteTransaction = async (req, res) => {
   const bankAccount = await BankAccount.findById(req.body.bankId);

   if (!bankAccount) {
      return res
         .status(404)
         .json({ errors: { account: "No bank account with that id." } });
   }

   if (bankAccount.userId !== req.user._id) {
      return res.status(400).json({
         errors: {
            user: "You dont own the bank account you wish to make changes to.",
         },
      });
   }

   bankAccount.transactions = await bankAccount.transactions.filter(
      (transaction) => transaction._id != req.params.id
   );

   try {
      await bankAccount.save();
      res.json(bankAccount);
   } catch (err) {
      return res.status(500).json({
         errors: { server: "An error occured. Try again later." },
      });
   }
};

module.exports = {
   getTransactionsForHousehold,
   createTransaction,
   updateTransaction,
   deleteTransaction,
};
