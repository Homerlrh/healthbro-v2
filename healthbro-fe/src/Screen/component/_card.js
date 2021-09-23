import React from "react";
import { BsFillPersonFill, BsFillClockFill } from "react-icons/bs";
import { Modal } from ".";

//recipe card
export default function _card({ recipe }) {
  //conditional render if the recipe prop is null
  return recipe ? (
    <div className="slide recipeCard">
      <img src={recipe.image} alt="recipeImg" />
      <div className="description">
        <p>{recipe.title}</p>
        <div>
          <span style={{ marginRight: 10 }}>
            <BsFillPersonFill />
            {recipe.servings}
          </span>
          <span>
            <BsFillClockFill />
            {recipe.readyInMinutes}
          </span>
        </div>
      </div>
      {recipe.summary ? (
        // use dangerouslySetInnerHTML due to the return json is a text with html tag
        // slice is used because only want to display the first 200 words
        <p
          className="summary"
          dangerouslySetInnerHTML={{
            __html: recipe.summary.slice(0, 200) + "...",
          }}
        ></p>
      ) : null}
      <Modal info={recipe} />
    </div>
  ) : (
    <></>
  );
}
