import React from "react";
import { BsFillPersonFill, BsFillClockFill } from "react-icons/bs";

export default function _card({
  imgUrl,
  recipeName,
  description,
  servings,
  readyInMinuted,
}) {
  return (
    <div className="slide recipeCard">
      <img src={imgUrl} alt="recipeImg" />
      <div className="description">
        <p>{recipeName}</p>
        <div>
          <span style={{ marginRight: 10 }}>
            <BsFillPersonFill />
            {servings}
          </span>
          <span>
            <BsFillClockFill />
            {readyInMinuted}
          </span>
        </div>
      </div>
      <div
        className="summary"
        dangerouslySetInnerHTML={{ __html: description.slice(0, 200) + "..." }}
      ></div>
      {/* will be a modal */}
      <button className="viewRecipe">View More</button>
    </div>
  );
}
