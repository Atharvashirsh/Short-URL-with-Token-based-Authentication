//* Require the JWT module
const jwt = require("jsonwebtoken");

//* Get the secret key
const secret = process.env.SECRET_KEY;

//* Create a setter function to create token for the User using the secret key
function setUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
    };
    return jwt.sign(payload, secret);
}

//* Create a getter function to verify the token with the secret key
function getUser(token) {
    if (!token) return null; //* Create a null check
    return jwt.verify(token, secret);
}

module.exports = { setUser, getUser };
