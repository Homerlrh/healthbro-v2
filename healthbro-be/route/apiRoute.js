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
  return res.status(200).json(data);
});

//get recipes with dietary options
router.post("/recipeSearch", isTokenValid, async (req, res, next) => {
  //get dietary options from request body
  const option = req.body;
  let query = "recipes/complexSearch?";

  //construct api query by using for in loop the obj
  for (const [key, value] of Object.entries(option)) {
    query += `${key}=${value}&`;
  }

  //slice the last <&> away due to the for in loop
  const data = await apiController(query.slice(0, -1));
  return res.status(200).json(data);
});

//get all recipes that user liked
//post recipe ids into user collection
router
  .route("/favouriteRecipe")
  .get(isTokenValid, tokenDecoder, async (req, res, next) => {
    //decode the user information from token to extract user id
    //then get user favourite recipes in the user collection
    const recipes = await dbUtil.getUserRecipeList(res.user.userId);

    //change favourite recipes list to comma-separatted
    const query = `recipes/informationBulk?ids=${recipes.join(",")}`;

    //return information in object form
    const data = await apiController(query);
    res.send(data);
  })
  .post(isTokenValid, tokenDecoder, (req, res, next) => {
    //receiced recipe id from front-end
    const { recipeId } = req.body;

    //get user id from decoded token
    const userId = res.user.userId;

    //if the recipe id is alreay stored in user collection then remove
    //else then add
    dbUtil.addOrRemoveRecipes(userId, recipeId, res);
  });

//get meal planning from api
//this end-point will spend most point due to calling api twice
//also it is the slowest
router.post("/mealPlan", isTokenValid, async (req, res, next) => {
  //get targetCalories from the body
  const { targetCalories } = req.body;
  //construct query to get mealplan id
  const query = `mealplanner/generate?timeFrame=day&targetCalories=${targetCalories}`;
  const data = await apiController(query);

  //filter the api response only left recipe id value
  const recipesIds = data.meals.map((ele) => ele.id);

  //construct api query again to get detail information of the recipe
  const query2 = `recipes/informationBulk?ids=${recipesIds.join(",")}`;
  const data2 = await apiController(query2);
  res.json(data2);
});

module.exports = router;
