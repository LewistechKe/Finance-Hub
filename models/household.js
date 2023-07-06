const { model, Schema } = require("mongoose");

// Household Schema
const householdSchema = new Schema({
   name: String,
   greeting: String,
   owner: {
      type: Schema.Types.ObjectID,
      ref: "users",
   },
   members: [
      {
         type: Schema.Types.ObjectID,
         ref: "users",
      },
   ],
});

// Export Model
module.exports = Household = model("households", householdSchema);
