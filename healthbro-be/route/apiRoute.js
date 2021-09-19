const express = require("express");
const apiController = require("../controller/apiController");

const router = express.Router();

//get random recipes to show
//number of recipes come from the param
router.get("/random", async (req, res, next) => {
  const { numberOfRecipes } = req.query;
  const data = await apiController(`recipes/random?number=${numberOfRecipes}`);
  return res.status(200).send(data);
});

//get recipes with dietary options
router.get("/recipeSearch", async (req, res, next) => {
  const option = req.body;
  let query = "recipes/complexSearch??";
  for (const [key, value] of Object.entries(option)) {
    query += `${key}=${value}&`;
  }
  const data = await apiController(query.slice(0, -1));
  return res.status(200).send(data);
});

//get all recipes that user liked
router.get("/favouriteRecipes", async (req, res, next) => {});

module.exports = router;
