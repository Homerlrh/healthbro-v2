const jwt = require("jsonwebtoken");

//extract data from jwt token and pass to another route to use
const tokenDecoder = (req, res, next) => {
  //extract token value from the request body
  const { token } = req.body;

  //decode the token into object then assign it to the response obj
  const decoded = jwt.decode(token);
  res.user = decoded;
  next();
};

module.exports = tokenDecoder;
