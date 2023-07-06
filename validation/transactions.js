module.exports.validateTransactionInput = (input) => {
   // Define errors
   let errors = {};

   // Validate type
   const validTypes = ["deposit", "withdrawal", "point of sale"];

   if (!input.type) {
      errors.type = "Transaction type field is required";
   } else if (!validTypes.includes(input.type)) {
      errors.type = "Transaction is invalid";
   }

   // Validate memo
   if (!input.memo) {
      errors.memo = "Memo field is required";
   }

   // Validate amount
   if (!input.amount) {
      errors.amount = "Amount field is required";
   }

   // Return errors and isValid boolean
   return {
      errors,
      isValid: !Object.keys(errors).length,
   };
};
