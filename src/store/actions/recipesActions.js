import axios from "axios";

import {
  FETCHING_START,
  FETCHING_FINISHED,
  FETCHING_ERROR,
  RECIPE_SELECT_START,
  RECIPE_SELECT_FINISHED,
  UPLOAD_SAVED_RECIPE
} from "./actionTypes";
import { key, proxy } from "../../shared/utility";

const fetchingStart = () => {
  return {
    type: FETCHING_START
  };
};

const fetchingFinished = recipes => {
  return {
    type: FETCHING_FINISHED,
    recipes: recipes
  };
};

const fetchingError = error => {
  return {
    type: FETCHING_ERROR,
    error: error
  };
};

const recipeSelectStart = () => {
  return {
    type: RECIPE_SELECT_START
  };
};

const recipeSelectFinished = recipe => {
  return {
    type: RECIPE_SELECT_FINISHED,
    recipe: recipe
  };
};

export const searchRecipes = query => {
  return dispatch => {
    dispatch(fetchingStart());
    axios
      .get(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`)
      .then(res => {
        console.log(
          `${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}.json`
        );
        console.log(res);
        dispatch(fetchingFinished(res.data.recipes));
      })
      .catch(error => {
        dispatch(fetchingError(error.message));
      });
  };
};

export const selectRecipe = id => {
  return dispatch => {
    dispatch(recipeSelectStart());

    axios
      .get(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${id}`)
      .then(res => {
        console.log(res.data.recipe);
        dispatch(recipeSelectFinished(res.data.recipe));
      })
      .catch(error => {
        dispatch(fetchingError(error.message));
      });
  };
};

export const uploadSavedRecipe = recipe => {
  return {
    type: UPLOAD_SAVED_RECIPE,
    recipe: recipe
  };
};
