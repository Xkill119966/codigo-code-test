const jwt = require("jsonwebtoken");
const config = require("../config");
class JwtSerivce {
  generateToken(payload, { expiresIn = null } = {}) {
    return jwt.sign(payload, config.jwt_private_key, {
      ...(expiresIn ? { expiresIn } : {}),
    });
  }

  async verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.jwt_private_key, function (err, payload) {
        if (err) {
          reject(err);
        }

        resolve(payload);
      });
    });
  }
}

module.exports = new JwtSerivce();
