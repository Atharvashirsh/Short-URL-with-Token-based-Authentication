const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { restrictTo } = require("../middleware/auth");

//*
router.get("/admin/url", restrictTo(["ADMIN"]), async (req, res) => {
    const allUrls = await URL.find({}); //* Fetch all the URLs created by all the user
    return res.render("home", {
        urls: allUrls,
    });
});

//* Create a GET route for the home URL
router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    const allUrls = await URL.find({ createdBy: req.user._id }); //* Only fetch the URLs created by the user
    return res.render("home", {
        urls: allUrls,
    });
});

//* Create a GET route for the signup URL
router.get("/signup", (req, res) => {
    return res.render("signup");
});

//* Create a GET route for the Login URL
router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;
