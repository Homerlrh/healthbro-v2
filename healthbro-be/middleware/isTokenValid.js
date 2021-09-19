const authController = require("../controller/authController");

const isTokenValid = (req, res, next) => {
  const token = req.body.token;
  if (token) {
    try {
      const result = authController.verifyToken(token);
      if (!result)
        return res
          .status(401)
          .send("Token expired or damaged, please login again");
      next();
    } catch (err) {
      res.status(500).send("server error, please try again later");
    }
  }
};

module.exports = isTokenValid;
