import React from "react";
import { connect } from "react-redux";

import classes from "./Favourites.module.css";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import RecipeListItem from "../../components/RecipeListItem/RecipeListItem";
import Message from "../../components/UI/Message/Message";
import Loader from "../../components/UI/Loader/Loader";

import { selectRecipe, fetchFavourites } from "../../store/actions";
import RecipeItem from "../../components/RecipeItem/RecipeItem";

class Favourites extends React.Component {
  componentDidMount() {
    this.props.fetchFavourites(this.props.userID);
  }

  calculateTime = ing => {
    return Math.ceil((ing / 3) * 15);
  };

  renderRecipes = () => {
    return this.props.recipes.map((recipe, i) => (
      <RecipeListItem
        key={i}
        recipeID={recipe.recipe_id}
        recipeImg={recipe.image_url}
        recipeTitle={recipe.title}
        author={recipe.publisher}
        click={() => this.props.selectRecipe(recipe.recipe_id)}
      />
    ));
  };

  render() {
    return (
      <Aux>
        {this.props.loading ? (
          <div className={classes.Container}>
            <Loader />
          </div>
        ) : (
          <div className={classes.Container}>
            <ul className={classes.RecipesList}>{this.renderRecipes()}</ul>
          </div>
        )}

        <Aux>
          {this.props.selectedRecipe !== null && !this.props.loadingTwo ? (
            <RecipeItem
              recipeImg={this.props.selectedRecipe.image_url}
              title={this.props.selectedRecipe.title}
              time={this.calculateTime(
                this.props.selectedRecipe.ingredients.length
              )}
              ingredients={this.props.selectedRecipe.ingredients}
              link={this.props.selectedRecipe.source_url}
              download={() =>
                this.downloadRecipe(
                  this.props.selectedRecipe,
                  this.props.selectedRecipe.title
                )
              }
              click={() => this.props.favourite(this.props.selectedRecipe)}
            />
          ) : this.props.loadingTwo ? (
            <div
              style={{
                height: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Loader />
            </div>
          ) : null}
        </Aux>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.favourites.favouriteRecepies,
    loading: state.favourites.loading,
    loadingTwo: state.recipes.loadingTwo,
    selectedRecipe: state.recipes.selectedRecipe,
    userID: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  { selectRecipe, fetchFavourites }
)(Favourites);
