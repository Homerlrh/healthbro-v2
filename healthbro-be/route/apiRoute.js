const express = require("express");
const apiController = require("../controller/apiController");
const tokenDecoder = require("../middleware/tokenDecoder");
const dbUtil = require("../Database/util");
const isTokenValid = require("../middleware/isTokenValid");

const router = express.Router();
//get random recipes to show
//number of recipes come from the param
router.get("/random", async (req, res, next) => {
  const { numberOfRecipes } = req.query;
  const data = await apiController(`recipes/random?number=${numberOfRecipes}`);
  return res.status(200).send(data);
});

//get recipes with dietary options
router.post("/recipeSearch", isTokenValid, async (req, res, next) => {
  const option = req.body;
  let query = "recipes/complexSearch??";
  for (const [key, value] of Object.entries(option)) {
    if (key == "token") continue;
    query += `${key}=${value}&`;
  }
  const data = await apiController(query.slice(0, -1));
  return res.status(200).send(data);
});

//get all recipes that user liked
//post recipe ids into user collection
router
  .route("/favouriteRecipe")
  .get(isTokenValid, tokenDecoder, async (req, res, next) => {
    const recipes = await dbUtil.getUserRecipeList(res.user.userId);
    const query = `/recipes/informationBulk?ids=${recipes.join(",")}`;
    const data = await apiController(query);
    res.send(data);
  })
  .post(isTokenValid, tokenDecoder, (req, res, next) => {
    const { recipeId } = req.body;
    const userId = res.user.userId;
    dbUtil.addOrRemoveRecipes(userId, recipeId, res);
  });

module.exports = router;
