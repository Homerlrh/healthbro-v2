const jwt = require("jsonwebtoken");

//extract data from jwt token and pass to another route to use
const tokenDecoder = (req, res, next) => {
  const { token } = req.body;
  const decoded = jwt.decode(token);
  res.user = decoded;
  next();
};

module.exports = tokenDecoder;
