const express = require("express");
const dbUtil = require("../Database/util");
const isTokenValid = require("../middleware/isTokenValid");

const router = express.Router();

//sign up
router.post("/signUp", async (req, res, next) => {
  const { name, email, password } = req.body;
  await dbUtil.createUser(name, email, password, res);
});

//login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  await dbUtil.login(email, password, res);
});

//only user who is logged in can change password
router.put("/changePassword", isTokenValid, async (req, res, next) => {
  const { email, password, newPassword } = req.body;
  await dbUtil.changePasswrod(email, password, newPassword, res);
});

module.exports = router;
