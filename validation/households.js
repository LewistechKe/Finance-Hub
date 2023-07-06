module.exports.validateHouseholdInput = (input) => {
   // Define Errors
   let errors = {};

   // Validate Name
   if (!input.name) {
      errors.name = "Name field is required";
   }

   // Validate Greeting
   if (!input.greeting) {
      errors.greeting = "Greeting field is required";
   }

   // Return errors and isValid boolean
   return {
      errors,
      isValid: !Object.keys(errors).length,
   };
};
