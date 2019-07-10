import React from "react";

import classes from "./SearchBar.module.css";
import { connect } from "react-redux";
import { searchRecipes, uploadSavedRecipe } from "../../store/actions";

class SearchBar extends React.Component {
  state = {
    input: ""
  };

  inputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  searchRecipe = () => {
    const { input } = this.state;

    this.props.searchRecipes(input);
    this.setState({ input: "" });
  };

  onChange = e => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async e => {
      const text = e.target.result;

      this.props.uploadSavedRecipe(JSON.parse(text));
    };
    reader.readAsText(e.target.files[0]);

    /* <input type="file" name="file" onChange={e => this.onChange(e)} />*/
  };

  render() {
    return (
      <div className={classes.Form}>
        <form>
          <input
            name="input"
            type="text"
            autoComplete="off"
            value={this.state.input}
            className={classes.Search}
            placeholder="Search recipes..."
            onChange={this.inputHandler}
          />
          <button
            type="button"
            className={classes.BtnLeft}
            onClick={this.searchRecipe}
          >
            <span>Search</span>
          </button>
          {/*<input type="file" name="file" onChange={e => this.onChange(e)} />*/}
          <button type="button" className={classes.BtnRight}>
            <span>Upload</span>
            <input type="file" onChange={e => this.onChange(e)} />
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { searchRecipes, uploadSavedRecipe }
)(SearchBar);
