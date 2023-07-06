const { model, Schema } = require("mongoose");

// Create User Schema
const UserSchema = new Schema({
   name: String,
   email: String,
   password: String,
   createdAt: {
      type: Date,
      default: Date.now,
   },
   role: { type: String, default: "personal" },
});

// Export User Model
module.exports = User = model("users", UserSchema);
