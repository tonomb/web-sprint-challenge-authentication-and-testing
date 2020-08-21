const jwt = require("jsonwebtoken");
const secrets = require('./secrets')

module.exports = function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const secret = secrets.secret_JWT ;

  const options = {
    expiresIn: "8h",
  };

  return jwt.sign(payload, secret, options);
}