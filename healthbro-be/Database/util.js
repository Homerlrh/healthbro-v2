const userSchema = require("./users");
const bcrypt = require("bcryptjs");
const authController = require("../controller/authController");

/**
 * Decription
 * @date 2021-09-18
 * @param {string} name Username
 * @param {string} email SignUp email
 * @param {string} password SignUp password
 * @returns {object} an object contain status code and message
 */
exports.createUser = (name, email, password, res) => {
  userSchema.findOne({ email: email }, async (err, user) => {
    if (!user) {
      try {
        const hashedPassword = await bcrypt.hash(password, 5);

        await userSchema
          .create({
            name: name,
            email: email,
            password: hashedPassword,
          })
          .then(async (user) => {
            res.status(200).send(authController.generateToken(user));
          });
      } catch (error) {
        res.status(500).send(error);
      }
    } else return res.status(401).send("You already registered");
  });
};

/**
 * Description
 * @date 2021-09-18
 * @param {string} email Login email
 * @param {string} password Login password
 * @returns {obj} an object contain status code and message
 */
exports.login = (email, password, res) => {
  userSchema.findOne({ email: email }, async (err, user) => {
    if (!user)
      return res
        .status(401)
        .send("You are not a user, please sign up an account");

    bcrypt.compare(password, user.password).then((result) => {
      if (result)
        return res.status(200).send({
          message: "login successful",
          token: authController.generateToken(user),
        });
      return res.status(403).send("password or email does not match");
    });
  });
};
