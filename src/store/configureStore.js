import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import recipesReducer from "./reducers/recipesReducer";
import authReducer from "./reducers/authReducer";
import favouriteReducer from "./reducers/favouriteRecipeReducer";

const rootReducer = combineReducers({
  recipes: recipesReducer,
  auth: authReducer,
  favourites: favouriteReducer
});

const configureStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};

export default configureStore;
