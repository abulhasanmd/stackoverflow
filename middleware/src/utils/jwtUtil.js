const jwt = require('jsonwebtoken');

function generateToken(userId, isAdmin) {
  const payload = {
    userId,
    isAdmin,
  };

  return jwt.sign(payload, process.env.SECRET);
}

module.exports = { generateToken };
