// Required Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Initiate express server
const app = express();

// Environment variables config to use '.env' file
require("dotenv").config();

// Set Static Folder To React Build Folder
app.use(express.static(path.join(__dirname, "client", "build")));

// CORS Middleware
app.use(cors());

// Parse Body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Store mongouri to connect to
const db =
   process.env.NODE_ENV !== "testing"
      ? process.env.MONGOURI
      : process.env.TEST_DB;

// Connect to Database
mongoose
   .connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
   })
   .then(() => {})
   .catch((err) => console.log(err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/bankaccounts", require("./routes/bankaccounts"));
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/households", require("./routes/households"));

// Serve React App
app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Variable For Port to be hosted on
const port = process.env.PORT;

if (process.env.NODE_ENV !== "testing") {
   app.listen(port, () => {
      console.log("🚀 Server running on port: " + port);
   });
}

module.exports = app;
