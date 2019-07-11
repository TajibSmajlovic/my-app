import {
  FAVOURITE_FINISH,
  FAVOURITE_START,
  FAVOURITE_SUCCESSFUL
} from "../actions/actionTypes";
import { ERROR_HANDLER } from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  favouriteRecepies: [],
  loading: false,
  error: null
};

const favourite = (state, action) =>
  updateObject(state, {
    favouriteRecepies: [...state.favouriteRecepies, action.favourites],
    loading: false
  });

const favouritesStart = (state, action) =>
  updateObject(state, { loading: true });

const favourieSuccessful = (state, action) =>
  updateObject(state, { loading: false });

const errorHandler = (state, action) =>
  updateObject(state, { error: null, loading: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVOURITE_START:
      return favouritesStart(state, action);
    case FAVOURITE_FINISH:
      return favourite(state, action);
    case FAVOURITE_SUCCESSFUL:
      return favourieSuccessful(state, action);
    case ERROR_HANDLER:
      return errorHandler(state, action);
    default:
      return state;
  }
};

export default reducer;
