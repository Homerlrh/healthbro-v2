import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AuthContext";
import { Card } from "./component";

//favourite recipe will show up once the page is render
export default function _favourite() {
  //state
  const [recipes, setRecipe] = useState([]);

  //context
  const { apiCaller } = useContext(AppContext);

  // useEffect hook, occour when the page is render
  // fetch a get request to the api server and get user's favourite recipe info
  useEffect(() => {
    (async function () {
      const result = await apiCaller.get("/api/favouriteRecipe");
      console.log(result.data);
      setRecipe(result.data);
    })();
  }, [setRecipe]);

  const cards = recipes.map((ele, i) => (
    <div className="s" key={i}>
      <Card recipe={ele} liked={true} />
    </div>
  ));

  return recipes ? (
    <div className="likedRecipesDisplayArea">{cards}</div>
  ) : null;
}
