import React from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import RecipeItem from "../../components/RecipeItem/RecipeItem";
import Loader from "../../components/UI/Loader/Loader";
import { favourite } from "../../store/actions/favouriteRecipeActions";

class Recipe extends React.Component {
  /*state = {
    value: false
  };

  buttonHandler = () => {
    this.setState(prevState => ({
      value: !prevState.value
    }));
  };*/

  calculateTime = ing => {
    return Math.ceil((ing / 3) * 15);
  };

  downloadRecipe = (exportObj, exportName) => {
    let dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(exportObj));
    let a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", exportName + ".json");
    document.body.appendChild(a); // required for firefox
    a.click();
    a.remove();
  };

  render() {
    return (
      <Aux>
        {this.props.selectedRecipe !== null && !this.props.loading ? (
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
            click={() =>
              this.props.favourite(this.props.selectedRecipe, this.props.userID)
            }
          />
        ) : this.props.loading ? (
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
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedRecipe: state.recipes.selectedRecipe,
    loading: state.recipes.loadingTwo,
    userID: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  { favourite }
)(Recipe);
