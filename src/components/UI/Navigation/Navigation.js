import React from "react";
import { connect } from "react-redux";
import { MdHome } from "react-icons/md";
import { IoIosLogIn, IoIosLogOut, IoIosHeart } from "react-icons/io";

import { setRoute } from "../../../store/actions/authActions";

import classes from "./Navigation.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import SearchBar from "../../../containers/SearchBar/SearchBar";

const navigationItems = props => (
  <ul className={classes.Navigation}>
    <NavigationItem link="/" exact clicked={() => props.setRoute("/")}>
      <MdHome />
    </NavigationItem>

    {props.route === "/" ? <SearchBar /> : null}

    <div className={classes.User}>
      {props.userID ? (
        <NavigationItem
          link="/favourites"
          exact
          clicked={() => props.setRoute("/favourites")}
        >
          <IoIosHeart />
        </NavigationItem>
      ) : null}

      <NavigationItem
        link={props.userID ? "/logout" : "/auth"}
        clicked={() => props.setRoute("/auth")}
      >
        {props.userID ? <IoIosLogOut /> : <IoIosLogIn />}
      </NavigationItem>
    </div>
  </ul>
);

const mapStateToProps = state => {
  return {
    userID: state.auth.userId,
    route: state.auth.route
  };
};

export default connect(
  mapStateToProps,
  { setRoute }
)(navigationItems);
