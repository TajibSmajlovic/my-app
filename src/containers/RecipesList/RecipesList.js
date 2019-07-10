import React from "react";
import { connect } from "react-redux";

import classes from "./RecipesList.module.css";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import RecipeListItem from "../../components/RecipeListItem/RecipeListItem";
import Message from "../../components/UI/Message/Message";
import Loader from "../../components/UI/Loader/Loader";

import { selectRecipe } from "../../store/actions";

class Recipes extends React.Component {
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
        {this.props.recipes.length === 0 && !this.props.loading ? (
          <div className={classes.Container}>
            <Message message={"What would you like to cook today?"} />
          </div>
        ) : this.props.loading ? (
          <div className={classes.Container}>
            <Loader />
          </div>
        ) : (
          <div className={classes.Container}>
            <ul className={classes.RecipesList}>{this.renderRecipes()}</ul>
          </div>
        )}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes.recipes,
    finished: state.recipes.finished,
    loading: state.recipes.loadingOne,
    selectedRecipe: state.recipes.selectedRecipe
  };
};

export default connect(
  mapStateToProps,
  { selectRecipe }
)(Recipes);
