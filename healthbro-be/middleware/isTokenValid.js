const authController = require("../controller/authController");

//check the token send from the front-end is valid
//if not then send response with server error
//else if the token is not in the body then
const isTokenValid = (req, res, next) => {
  //get JWT token from the request header
  const { authorization } = req.headers;
  if (authorization) {
    try {
      //response if the token is invalid or expired
      const result = authController.verifyToken(authorization);
      if (!result)
        return res
          .status(403)
          .json("Token expired or damaged, please login again");
      next();
    } catch (err) {
      res.status(500).json("server error, please try again later");
    }
  } else {
    //response if token is not included or empty in the request header
    res.status(403).json("Please login or sign up an account to use, thanks!");
  }
};

module.exports = isTokenValid;
