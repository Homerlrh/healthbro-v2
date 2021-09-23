const jwt = require("jsonwebtoken");

/**
 * generate JWT token base on user data and expire in 7 day
 * @date 2021-09-18
 * @param {object} data user data
 * @returns {string} JWT token
 */
exports.generateToken = (data) => {
  const token = jwt.sign(data, process.env.JWT, {
    expiresIn: "7d",
  });
  return token;
};

/**
 * JWT token validator
 * @date 2021-09-18
 * @param {string} token JWT toke
 * @returns {boolean}
 */
exports.verifyToken = (token) => {
  const state = jwt.verify(token, process.env.JWT, (err) => {
    if (err) {
      console.log(err);
      return false;
    }
    return true;
  });
  return state;
};
