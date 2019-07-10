import {
  FETCHING_START,
  FETCHING_FINISHED,
  FETCHING_ERROR,
  RECIPE_SELECT_START,
  RECIPE_SELECT_FINISHED,
  UPLOAD_SAVED_RECIPE
} from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  recipes: [],
  selectedRecipe: null,
  loadingOne: false,
  loadingTwo: false,
  error: null
};

const fetchingStart = (state, action) =>
  updateObject(state, { loadingOne: true });

const fetchingFinished = (state, action) =>
  updateObject(state, {
    recipes: action.recipes,
    loadingOne: false
  });

const fetchingError = (state, action) =>
  updateObject(state, {
    error: action.error
  });

const recipeSelectStart = (state, action) =>
  updateObject(state, { loadingTwo: true });

const recipeSelectFinished = (state, action) =>
  updateObject(state, {
    selectedRecipe: action.recipe,
    loadingTwo: false
  });

const updateSavedRecipe = (state, action) =>
  updateObject(state, { selectedRecipe: action.recipe });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_START:
      return fetchingStart(state, action);
    case FETCHING_FINISHED:
      return fetchingFinished(state, action);
    case FETCHING_ERROR:
      return fetchingError(state, action);
    case RECIPE_SELECT_START:
      return recipeSelectStart(state, action);
    case RECIPE_SELECT_FINISHED:
      return recipeSelectFinished(state, action);
    case UPLOAD_SAVED_RECIPE:
      return updateSavedRecipe(state, action);
    default:
      return state;
  }
};

export default reducer;
