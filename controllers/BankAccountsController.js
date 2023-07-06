// Require Bank Account Model
const bankaccount = require("../models/bankaccount");
const BankAccount = require("../models/bankaccount");

// Validate Bank Account Input Function
const { validateBankAccountInput } = require("../validation/bankaccounts");

// Get all bank accounts
const getAll = async (req, res) => {
   try {
      const accounts = await BankAccount.find();
      return res.json(accounts);
   } catch (err) {
      return res.status(500).json({
         errors: { server: "An error occured. Try again later." },
      });
   }
};

// Get bank account by id
const getById = async (req, res) => {
   try {
      const account = await BankAccount.findById(req.params.id);
      if (!account)
         return res
            .status(404)
            .json({ errors: { account: "Bank account not found" } });
      return res.json(account);
   } catch (err) {
      return res.status(500).json({
         errors: { server: "An error occured. Try again later." },
      });
   }
};

// Create Bank Account
const createBankAccount = async (req, res) => {
   const { errors, isValid } = validateBankAccountInput(req.body);

   if (!isValid) return res.status(400).json({ errors });

   const bankAccount = await BankAccount.findOne({
      name: req.body.name,
      userId: req.user._id,
   });

   if (bankAccount) {
      return res.status(400).json({
         errors: { name: "You already have a bank account with that name" },
      });
   }

   try {
      const newBankAccount = new BankAccount({
         name: req.body.name,
         type: req.body.type,
         balance: req.body.balance,
         lowBalanceAlert: req.body.lowBalanceAlert,
         userId: req.user._id,
      });

      await newBankAccount.save();

      res.json(newBankAccount);
   } catch (err) {
      return res.status(500).json({
         errors: { server: "An error occured. Try again later." },
      });
   }
};

// Edit Bank Account
const updateBankAccount = async (req, res) => {
   const { errors, isValid } = validateBankAccountInput(req.body);

   if (!isValid) return res.status(400).json({ errors });

   const bankAccount = await BankAccount.findById(req.params.id);

   if (!bankAccount) {
      return res
         .status(404)
         .json({ errors: { account: "No Bank Account with that ID." } });
   }

   if (bankAccount.userId !== req.user._id) {
      return res.status(400).json({
         errors: {
            account: "You don't own the bank account you're trying to update",
         },
      });
   }

   bankAccount.name = req.body.name;
   bankAccount.type = req.body.type;
   bankAccount.balance = req.body.balance;
   bankAccount.lowBalanceAlert = req.body.lowBalanceAlert;

   try {
      const updatedBankAccount = await bankAccount.save();
      res.json(updatedBankAccount);
   } catch (err) {
      return res.status(500).json({
         errors: { server: "An error occured. Try again later." },
      });
   }
};

// Delete Bank Account
const deleteBankAccount = async (req, res) => {
   const bankAccount = await BankAccount.findById(req.params.id);

   if (!bankAccount) {
      return res
         .status(404)
         .json({ errors: { account: "Bank account not found." } });
   }

   try {
      await bankAccount.delete();
      res.json(bankAccount);
   } catch (err) {
      return res.status(500).json({
         errors: { server: "An error occured. Try again later." },
      });
   }
};

// Link Bank Account to Household
const linkBankAccount = async (req, res) => {
   const bankAccount = await BankAccount.findById(req.params.id);

   if (!bankAccount) {
      return res
         .status(404)
         .json({ errors: { account: "Bank account not found." } });
   }

   if (bankAccount.userId !== req.user._id) {
      return res.status(400).json({
         errors: {
            account: "You don't own the bank account you're trying to update",
         },
      });
   }

   if (!req.body.householdId) {
      return res.status(400).json({
         errors: {
            household: "You must provide a valid household id",
         },
      });
   }
   bankAccount.linkedTo = req.body.householdId;

   try {
      await bankAccount.save();
      res.json(bankAccount);
   } catch (err) {
      return res.status(500).json({
         errors: { server: "An error occured. Try again later." },
      });
   }
};

// Export Functions
module.exports = {
   getAll,
   getById,
   createBankAccount,
   updateBankAccount,
   deleteBankAccount,
   linkBankAccount,
};
