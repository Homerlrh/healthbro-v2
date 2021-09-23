import React, { useState, useContext } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import { BsSearch } from "react-icons/bs";
import { AppContext } from "../context/AuthContext";
import { Card } from "./component";

// search recipe with user's dietary option
// calories, intolerances, diet, ingredien
// return object should limit to 10 recipes
export default function _recipeSearch() {
  //state variables
  const [ingredien, setIngredien] = useState("");
  const [calorie, setcalorie] = useState("");
  const [dietTags, setDietTagss] = useState([]);
  const [intolerancesTags, setIntolerancesTags] = useState([]);
  const [recipes, setRecipe] = useState([]);

  //context
  const { apiCaller } = useContext(AppContext);

  //recipe search handler
  const handleSearch = async () => {
    const body = {
      query: ingredien,
      Maxcalories: calorie,
      diet: dietTags.join(","),
      intolerances: intolerancesTags.join(","),
      number: 9,
      addRecipeInformation: true,
    };

    //filter the body data if the value is null
    const filterdBody = Object.fromEntries(
      Object.entries(body).filter(([_, v]) => v !== "")
    );

    //api with post request will filtered body data
    const result = await apiCaller.post("/api/recipeSearch", filterdBody);

    //set recipe state to the returned data
    setRecipe(result.data.results);
  };

  //construct card component
  const cardGrp = [...recipes].map((ele, i) => (
    <div className="s" key={i}>
      <Card recipe={ele} />
    </div>
  ));
  return (
    <div className="recipeSearch">
      <div className="recipesSearchArea">
        <h1>Find Recipe</h1>
        <div className="inputArea">
          <div>
            <label>INGREDIEN</label>{" "}
            <input
              name="ingredien"
              type="text"
              value={ingredien}
              onChange={(e) => setIngredien(e.target.value)}
            />
          </div>
          <div>
            <label>CALORIE</label>{" "}
            <input
              name="calories"
              type="number"
              value={calorie}
              onChange={(e) => setcalorie(e.target.value)}
            />
          </div>
          <div className="searchButton" onClick={handleSearch}>
            <BsSearch size={30} />
          </div>
        </div>
        <div className="tagList">
          <ReactTagInput
            tags={dietTags}
            placeholder="Enter dietary options"
            onChange={(newTags) => setDietTagss(newTags)}
          />
        </div>
        <div className="tagList">
          <ReactTagInput
            tags={intolerancesTags}
            placeholder="Enter intolerances options"
            onChange={(newTags) => setIntolerancesTags(newTags)}
          />
        </div>
      </div>
      <div className="recipesDisplayArea">{cardGrp}</div>
    </div>
  );
}
