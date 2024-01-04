//* Require the getter function of authentication
const { getUser } = require("../service/service");

//* Authentication middleware to only allow access to logged in user only
function checkForAuthentication(req, res, next) {
    const tokenValue = req.cookies?.uid;
    req.user = null;

    if (!tokenValue) return next();

    const token = tokenValue;
    const user = getUser(token);

    req.user = user;
    return next();
}

//* Authorization middleware that checks if user is authorized to access the site or not.
function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) return res.redirect("/login");

        if (!roles.includes(req.user.role)) return res.end("<h1>UnAuthorized</h1>");
        return next();
    };
}

module.exports = { checkForAuthentication, restrictTo };
