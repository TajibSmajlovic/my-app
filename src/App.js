import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import asyncComponent from "./shared/asyncComponent";
import { authCheckState } from "./store/actions/authActions";
import { fetchFavourites } from "./store/actions/favouriteRecipeActions";

import Aux from "./hoc/Auxiliary/Auxiliary";
import Layout from "./hoc/Layout/Layout";
import Navigation from "./components/UI/Navigation/Navigation";
import RecipesList from "./containers/RecipesList/RecipesList";
import Recipe from "./containers/Recipe/Recipe";
// import Auth from "./containers/Auth/Auth";
// import Logout from "./containers/Auth/Logout/Logout";
import Favourites from "./containers/Favourites/Favourites";

const AsyncAuth = asyncComponent(() => import("./containers/Auth/Auth"));
const AsyncLogout = asyncComponent(() =>
  import("./containers/Auth/Logout/Logout")
);

class App extends React.Component {
  componentDidMount() {}

  render() {
    const MainApp = () => {
      this.props.authCheckState();
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
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => MainApp()} />
          <Route path="/auth" component={AsyncAuth} />
          <Route path="/logout" component={AsyncLogout} />
          <Route path="/favourites" component={Favourites} />
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    userID: state.auth.userId
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { authCheckState, fetchFavourites }
  )(App)
);
