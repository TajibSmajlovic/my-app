import React from "react";

import classes from "./RecipeListItem.module.css";

const limitRecipeTitle = title => {
  return title
    .split(" ")
    .slice(0, 3)
    .join(" ");
};

const recipe = props => (
  <li onClick={props.click}>
    <div className={classes.Recipe}>
      <img
        className={classes.Img}
        src={props.recipeImg}
        alt={props.recipeTitle}
      />

      <div>
        <h4 className={classes.Name}>{limitRecipeTitle(props.recipeTitle)}</h4>
        <p className={classes.Author}>{props.author}</p>
      </div>
    </div>
  </li>
);

export default recipe;
