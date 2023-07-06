const { Schema } = require("mongoose");

const TransactionSchema = new Schema({
   type: String, // Deposit, Withdrawal, Point of Sale
   memo: String,
   amount: Number,
   date: { type: Date, default: Date.now() },
});

module.exports = TransactionSchema;
