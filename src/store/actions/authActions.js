import {
  AUTH_START,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_ROUTE
} from "./actionTypes";

import axios from "axios";

import { apiKey } from "../../shared/utility";

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: AUTH_FAIL,
    error: error
  };
};

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userID");
  return {
    type: AUTH_LOGOUT
  };
};

export const setRoute = route => {
  return {
    type: SET_ROUTE,
    route: route
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logOut());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;
    if (!isSignup) {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;
    }
    axios
      .post(url, authData)
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );

        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userID", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
        dispatch(setRoute("/"));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logOut());
    } else {
      const expirationTime = new Date(localStorage.getItem("expirationDate"));
      if (expirationTime <= new Date()) {
        dispatch(logOut());
      } else {
        const userID = localStorage.getItem("userID");
        dispatch(authSuccess(token, userID));
        dispatch(
          checkAuthTimeout(
            (expirationTime.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
