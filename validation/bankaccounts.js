// Validate Bank Account Input
module.exports.validateBankAccountInput = (input) => {
   // Define errors as empty object
   let errors = {};

   // Validate name
   if (!input.name) {
      errors.name = "Name field is required";
   }

   // Valid types array
   const validTypes = ["checking", "savings", "credit"];

   // Validate type
   if (!input.type) {
      errors.type = "Type field is required";
   } else if (!validTypes.includes(input.type)) {
      errors.type = "Invalid type";
   }

   // Validate balance
   if (!input.balance) {
      errors.balance = "Balance field is required";
   }

   // Validate low balance alert
   if (!input.lowBalanceAlert) {
      errors.lowBalanceAlert = "Low Balance Alert is required";
   } else if (parseInt(input.lowBalanceAlert) > parseInt(input.balance)) {
      errors.lowBalanceAlert =
         "Low balance alert must be less than starting balance";
   }

   // Returns errors object and isValid boolean
   return {
      errors,
      isValid: !Object.keys(errors).length,
   };
};
