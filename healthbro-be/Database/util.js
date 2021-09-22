const userSchema = require("./users");
const bcrypt = require("bcryptjs");
const authController = require("../controller/authController");

/**
 * Create a user with user's information
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
            const data = {
              userId: user._id,
              userName: user.name,
              email: user.email,
            };
            res.status(200).send({
              message: "User created",
              userName: user.name,
              email: user.email,
              token: authController.generateToken(data),
            });
          });
      } catch (error) {
        res.status(500).send(error);
      }
    } else return res.status(401).send({ error: "You already registered" });
  });
};

/**
 * User login
 * @date 2021-09-18
 * @param {string} email Login email
 * @param {string} password Login password
 * @returns {object} an object contain status code and message
 */
exports.login = (email, password, res) => {
  userSchema.findOne({ email: email }, async (err, user) => {
    if (!user)
      return res
        .status(401)
        .send({ error: "You are not a user, please sign up an account" });

    bcrypt.compare(password, user.password).then((result) => {
      if (result) {
        const data = {
          userId: user._id,
          userName: user.name,
          email: user.email,
        };
        return res.status(200).send({
          message: "login successful",
          userName: user.name,
          email: user.email,
          token: authController.generateToken(data),
        });
      }

      return res
        .status(403)
        .send({ error: "password or email does not match" });
    });
  });
};

/**
 * Add recipe id to user collection
 * @date 2021-09-20
 * @param {sting} id user id
 * @param {number} recipesId
 * @returns {obj} an object contain status code and message
 */
exports.addOrRemoveRecipes = (id, recipesId, res) => {
  userSchema.findOne({ _id: id }, (err, doc) => {
    if (err)
      return res
        .status(500)
        .send({ error: "Something went wrong pleast try again later" });

    const recipesList = doc.favourite;
    let query;
    let message = "";
    if (!recipesList.includes(recipesId)) {
      query = { $push: { favourite: recipesId } };
      message = "Recipe added";
    } else {
      query = {
        $set: { favourite: recipesList.filter((ele) => ele != recipesId) },
      };
      message = "Recipe removed";
    }

    doc.updateOne(query, (err, updatedDoc) => {
      if (err)
        return res
          .status(500)
          .send({ error: "Something went wrong pleast try again later" });

      return res.status(200).send(message);
    });
  });
};

/**
 * Get all recipe ids in the user collection
 * @date 2021-09-20
 * @param {sting} id user id
 * @returns {array} an array contain recipe ids
 */
exports.getUserRecipeList = async (id) => {
  const user = await new Promise((res, rej) => {
    userSchema.findById(id, (err, doc) => {
      if (err)
        return res
          .status(500)
          .send({ error: "Something went wrong pleast try again later" });

      res(doc);
    });
  });
  return user.favourite;
};
