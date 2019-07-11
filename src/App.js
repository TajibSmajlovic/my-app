import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import asyncComponent from "./shared/asyncComponent";
import { authCheckState } from "./store/actions/authActions";
import { fetchFavourites } from "./store/actions/favouriteRecipeActions";
import { errorHandler } from "./store/actions";

import Aux from "./hoc/Auxiliary/Auxiliary";
import Layout from "./hoc/Layout/Layout";
import Navigation from "./components/UI/Navigation/Navigation";
import RecipesList from "./containers/RecipesList/RecipesList";
import Recipe from "./containers/Recipe/Recipe";
// import Auth from "./containers/Auth/Auth";
// import Logout from "./containers/Auth/Logout/Logout";
import Favourites from "./containers/Favourites/Favourites";
import Backdrop from "./components/UI/Backdrop/Backdrop";
import Message from "./components/UI/Message/Message";

const AsyncAuth = asyncComponent(() => import("./containers/Auth/Auth"));
const AsyncLogout = asyncComponent(() =>
  import("./containers/Auth/Logout/Logout")
);

class App extends React.Component {
  componentDidMount() {
    this.props.authCheckState();
  }

  render() {
    const MainApp = () => {
      //console.log(this.props.userID);
      return (
        <Aux>
          <RecipesList />
          <Recipe />
        </Aux>
      );
    };

    return (
      <Layout>
        {this.props.errorOne || this.props.errorTwo ? (
          <Backdrop clicked={this.props.errorHandler}>
            <Message
              message={
                this.props.errorOne
                  ? this.props.errorOne
                  : this.props.errorTwo
                  ? this.props.errorTwo
                  : null
              }
            />
          </Backdrop>
        ) : null}
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => MainApp()} />
          <Route path="/auth" component={AsyncAuth} />
          <Route path="/logout" component={AsyncLogout} />
          {this.props.userID ? (
            <Route path="/favourites" component={Favourites} />
          ) : (
            <Redirect to="/" />
          )}
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    userID: state.auth.userId,
    errorOne: state.recipes.error,
    errorTwo: state.auth.error
  };
};

export default connect(
  mapStateToProps,
  { authCheckState, fetchFavourites, errorHandler }
)(App);
