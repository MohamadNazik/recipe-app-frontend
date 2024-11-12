import React from "react";
import favIcon from "../assets/lineheart.svg";
import redFavIcon from "../assets/redfillheart.svg";

function RecipeCard({
  mealId,
  img,
  category,
  recipeName,
  isFavorite,
  add,
  remove,
}) {
  return (
    <div className="flex flex-col gap-2">
      <img src={img} alt="image" className="w-44 rounded-3xl" />
      <div className="flex gap-2 items-center">
        <span className="text-sm">{category}</span>
        {isFavorite ? (
          <img
            src={redFavIcon}
            alt="fav icon"
            className="w-4 cursor-pointer"
            onClick={() => remove(mealId)}
          />
        ) : (
          <img
            src={favIcon}
            alt="fav icon"
            className="w-4 cursor-pointer"
            onClick={() => add(mealId)}
          />
        )}
      </div>
      <p className="text-md font-medium w-44">{recipeName}</p>
    </div>
  );
}

export default RecipeCard;
