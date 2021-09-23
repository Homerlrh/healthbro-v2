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
  //check wheather the user is alredy in the collection
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
            res.status(200).json({
              message: "User created",
              userName: user.name,
              email: user.email,
              token: authController.generateToken(data),
            });
          });
      } catch (error) {
        res.status(500).json(error);
      }
    }
    //user email is already in mongo db > user collection
    //conflict
    return res.status(409).json({ error: "You already registered" });
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
  //check wheather the user is alredy in the collection
  userSchema.findOne({ email: email }, async (err, user) => {
    if (!user)
      return res
        .status(401)
        .json({ error: "You are not a user, please sign up an account" });

    //check password match the record
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

      //return status code 403(forbidden) if the password not match the record
      return res
        .status(403)
        .json({ error: "password or email does not match" });
    });
  });
};

/**
 * Add recipe id to user collection
 * @date 2021-09-20
 * @param {sting} id user id
 * @param {number} recipesId
 * @returns {object} an object contain status code and message
 */
exports.addOrRemoveRecipes = (id, recipesId, res) => {
  userSchema.findOne({ _id: id }, (err, doc) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Something went wrong pleast try again later" });

    const recipesList = doc.favourite;
    let query;
    let message = "";

    //if the recipesId is already in the collection then remove else vise versa
    //change the mongoose query and response message due to the existence of the recipesId
    if (!recipesList.includes(recipesId)) {
      query = { $push: { favourite: recipesId } };
      message = "Recipe added";
    } else {
      query = {
        $set: { favourite: recipesList.filter((ele) => ele != recipesId) },
      };
      message = "Recipe removed";
    }

    //update the collection data according to the result above
    doc.updateOne(query, (err, updatedDoc) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Something went wrong pleast try again later" });

      return res.status(200).json(message);
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

/**
 * Update user's password
 * @date 2021-09-23
 * @param {string} email
 * @param {string} password
 * @param {string} newPassword
 * @returns {any} an object contain status code and message
 */
exports.changePasswrod = async (email, password, newPassword, res) => {
  userSchema.findOne({ email: email }, (err, user) => {
    if (err)
      return res
        .status(500)
        .send({ error: "Something went wrong pleast try again later" });

    //compare the old password to the recorded password
    bcrypt.compare(password, user.password).then((result) => {
      //if record match, then update password
      if (result) {
        user.updateOne(
          { $set: { password: newPassword } },
          (err, updatedDoc) => {
            if (err)
              return res
                .status(500)
                .json({ error: "Something went wrong pleast try again later" });

            return res.status(200).json({ message: "Password Updated" });
          }
        );
      }

      //return status code 403(forbidden) if the password not match the record
      return res.status(403).json({
        error: "password does not match the record, please try again",
      });
    });
  });
};
