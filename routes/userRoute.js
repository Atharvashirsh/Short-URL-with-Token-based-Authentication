const express = require("express");
const router = express.Router();
const { userSignup, userLogin, userLogout } = require("../controllers/user");

//* Create a POST Route for the home URL. It saves the user data to DB.
router.post("/", userSignup);

//* Create a POST Route for the login URL. It validates the user data.
router.post("/login", userLogin);

router.post("/logout", userLogout);

module.exports = router;
