import { ERROR_HANDLER } from "./actionTypes";

export {
  searchRecipes,
  selectRecipe,
  uploadSavedRecipe
} from "./recipesActions";
//export { searchRecipes, selectRecipe } from "./recipesActions";

export { fetchFavourites, favourite } from "./favouriteRecipeActions";
export { auth, authCheckState } from "./authActions";

export const errorHandler = () => {
  return {
    type: ERROR_HANDLER
  };
};
