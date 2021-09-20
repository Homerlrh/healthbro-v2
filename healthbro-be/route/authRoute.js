const express = require("express");
const router = express.Router();

const dbUtil = require("../Database/util");
const isTokenValid = require("../middleware/isTokenValid");

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

module.exports = router;
