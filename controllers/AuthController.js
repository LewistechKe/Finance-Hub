// Required Packages
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../models/user");

// Validation Functions
const {
   validateRegisterInput,
   validateLoginInput,
} = require("../validation/auth");

// JWT Secret from environment variable
const secret = process.env.JWT_SECRET;

// Generate Token Function Used in both register and login functions
const generateToken = (user) => {
   return jwt.sign(
      {
         _id: user._id,
         name: user.name,
         email: user.email,
         createdAt: user.createdAt,
         role: user.role,
      },
      secret,
      { expiresIn: "1h" }
   );
};

// Register User
const registerUser = async (req, res) => {
   const { errors, isValid } = validateRegisterInput(req.body);

   if (!isValid) {
      return res.status(400).json({ errors });
   }

   const user = await User.findOne({ email: req.body.email });

   if (user) {
      return res.status(400).json({
         errors: { email: "There is already a user with that email" },
      });
   }

   const hashedPassword = await bcrypt.hash(req.body.password, 12);

   const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
   });

   const savedUser = await newUser.save();

   const token = generateToken(savedUser);

   res.json({ token });
};

// Login
const login = async (req, res) => {
   const { errors, isValid } = validateLoginInput(req.body);

   if (!isValid) {
      return res.status(400).json({ errors });
   }

   const user = await User.findOne({ email: req.body.email });

   if (!user) {
      return res
         .status(400)
         .json({ errors: { email: "No user with that email" } });
   }

   const match = await bcrypt.compare(req.body.password, user.password);

   if (!match) {
      return res
         .status(400)
         .json({ errors: { password: "Incorrect password" } });
   }

   const token = generateToken(user);

   res.json({ token });
};

// Export register and login functions
module.exports = {
   registerUser,
   login,
};
