import React from "react";
import {
  MdAvTimer,
  MdFileDownload,
  MdCheckCircle,
  MdLink
} from "react-icons/md";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { IoIosHeart } from "react-icons/io";

import classes from "./RecipeItem.module.css";

/*{props.userID !== null && props.route === "/" ? (
  <IoIosHeart className={classes.Favourite} onClick={props.click} /> ? (
    props.userID && props.route === "/favourites"
  ) : (
    <IoMdTrash className={classes.Favourite} onClick={props.click} />
  )
) : null}*/

const RecipeItem = props => (
  <div className={classes.Container}>
    <div className={classes.ContainerOne}>
      <div className={classes.Recipe}>
        {props.userID && props.route === "/" ? (
          <IoIosHeart className={classes.Favourite} onClick={props.click} />
        ) : null}
        <img src={props.recipeImg} alt="Tomato" className={classes.RecipeImg} />
        <h1 className={classes.RecipeTitle}>
          <span>{props.title}</span>
        </h1>
      </div>
    </div>
    <div className={classes.ContainerTwo}>
      <div>
        <ul className={classes.Details}>
          <li>
            <MdAvTimer />
            {props.time} minutes to make
          </li>
          <div className={classes.Buttons}>
            <button
              className={classes.BtnLeft}
              onClick={() => <Redirect to={props.link} />}
            >
              <a href={props.link} target="_blank">
                <MdLink />
                visit
              </a>
            </button>
            <button onClick={props.download} className={classes.BtnRight}>
              <MdFileDownload />
              download
            </button>
          </div>
        </ul>
      </div>
      <hr style={{ margin: 0 }} />
      <div>
        <ul className={classes.IngredientsList}>
          <span className={classes.Ingredients}>Ingredients:</span>
          {props.ingredients.map((ing, i) => (
            <li key={i} className={classes.IngredientItem}>
              <MdCheckCircle />
              <span>{ing}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    userID: state.auth.userId,
    route: state.auth.route
  };
};

export default connect(mapStateToProps)(RecipeItem);
