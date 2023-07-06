const { model, Schema } = require("mongoose");

const TransactionSchema = require("./transaction");

// Define Bank Account Schema
const BankAccountSchema = new Schema({
   name: String,
   type: String,
   balance: Number,
   lowBalanceAlert: Number,
   transactions: [TransactionSchema],
   createdAt: {
      type: Date,
      default: Date.now,
   },
   linkedTo: String,
   userId: String,
});

module.exports = BankAccount = model("bankAccounts", BankAccountSchema);
