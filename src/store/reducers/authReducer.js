import {
  AUTH_START,
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  AUTH_FAIL,
  SET_ROUTE,
  ERROR_HANDLER
} from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  route: "/"
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false,
    route: "/"
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const errorHandler = (state, action) => updateObject(state, { error: null });

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};

const setRoute = (state, action) => {
  return updateObject(state, { route: action.route });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    case AUTH_LOGOUT:
      return authLogout(state, action);
    case SET_ROUTE:
      return setRoute(state, action);
    case ERROR_HANDLER:
      return errorHandler(state, action);
    default:
      return state;
  }
};

export default reducer;
