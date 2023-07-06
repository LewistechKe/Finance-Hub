// Required Packages
const express = require("express");

// Define Router
const router = express.Router();

// Household Controller
const HouseholdController = require("../controllers/HouseholdController");

// Authenticate Middleware
const authenticate = require("../middleware/authenticate");

// Check ID Middleware
const checkId = require("../middleware/checkId");

// @route POST /api/households/create
// @desc Create a household
// @access Private
router.post("/create", authenticate, HouseholdController.createHousehold);

// @route GET /api/households/
// @desc Get a household by user
// @access Private
router.get("/", authenticate, HouseholdController.getHouseholdByUser);

// @route PUT /api/households/join/:id
// @desc Join household
// @access Private
router.put(
   "/join/:id",
   authenticate,
   checkId,
   HouseholdController.joinHousehold
);

// @route PUT /api/households/leave/:id
// @desc Leave household
// @access Private
router.put(
   "/leave/:id",
   authenticate,
   checkId,
   HouseholdController.leaveHousehold
);

// @route POST /api/households/invite/:id
// @desc Invite user to household
// @access Private
router.post(
   "/invite/:id",
   authenticate,
   checkId,
   HouseholdController.inviteUserToHousehold
);

// @route DELETE /api/households/:id
// @desc Delete household
// @access Private
router.delete(
   "/:id",
   authenticate,
   checkId,
   HouseholdController.deleteHousehold
);

// Export Router
module.exports = router;
