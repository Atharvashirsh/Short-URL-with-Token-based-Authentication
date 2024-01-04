//* Require the USER Database
const USER = require("../models/user");

//* Require the setter function of authentication hashmap
const { setUser } = require("../service/service");

//* Create user signup function that saves the user data to DB
async function userSignup(req, res) {
    const { name, email, password, role } = req.body;
    await USER.create({
        name,
        email,
        password,
        role,
    });

    return res.redirect("/");
}

//* Create user login function that validates the user data
async function userLogin(req, res) {
    const { email, password } = req.body;
    const user = await USER.findOne({ email, password });

    if (!user) {
        return res.render("login", { error: "Invalid Username or password" });
    }

    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect("/");
}

//* Create user logout function that logs out the user and redirect it to the login page
function userLogout(req, res) {
    if (!req.cookies.uid) return res.redirect("/");

    res.clearCookie("uid");

    return res.redirect("/");
}

module.exports = { userSignup, userLogin, userLogout };
