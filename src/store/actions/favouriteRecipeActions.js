import axios from "axios";

import {
  FAVOURITE_SUCCESSFUL,
  FAVOURITE_FINISH,
  FAVOURITE_START
} from "./actionTypes";
import firebase from "../../shared/firebase";
import { db } from "../../shared/utility";

const favouriteStart = () => {
  return {
    type: FAVOURITE_START
  };
};
const favouriteFinished = recipe => {
  return {
    type: FAVOURITE_FINISH,
    favourites: recipe
  };
};

const fetchSuccessfull = () => {
  return {
    type: FAVOURITE_SUCCESSFUL
  };
};

export const favourite = (recipe, userId) => {
  return dispatch => {
    dispatch(favouriteStart());
    axios
      .post(`${db}/${userId}/favourites.json`, recipe)
      .then(res => {
        // console.log("success");
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const fetchFavourites = userId => {
  //let array = [];

  return dispatch => {
    dispatch(favouriteStart());
    let ref = firebase.database().ref(`${userId}/favourites`);
    ref.on("child_added", snap => {
      dispatch(favouriteFinished(snap.val()));
      dispatch(fetchSuccessfull());
    });
    //dispatch(favouriteFinished(array));
  };
};
