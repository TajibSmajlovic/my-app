import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import classes from "./Auth.module.css";
import "./Auth.module.css";
import { auth } from "../../store/actions/authActions";

class Auth extends React.Component {
  state = {
    email: "",
    password: "",
    isSignUp: false
  };

  inputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  buttonHandler = () => {
    this.setState(prevState => ({
      isSignUp: !prevState.isSignUp
    }));
  };

  render() {
    const { email, password, isSignUp } = this.state;

    return (
      <div>
        {this.props.userID ? (
          <Redirect to="/" />
        ) : (
          <div style={{ textAlign: "center" }}>
            <form className={classes.Container}>
              <h1>{isSignUp ? "Register" : "Login"}</h1>
              <input
                type="email"
                name="email"
                placeholder="enter your username"
                value={email}
                className={classes.Input}
                onChange={this.inputHandler}
              />
              <input
                type="password"
                name="password"
                placeholder="enter password"
                value={password}
                className={classes.Input}
                onChange={this.inputHandler}
              />
              <button
                type="button"
                className={classes.Button}
                onClick={() => this.props.auth(email, password, isSignUp)}
              >
                Submit
              </button>
            </form>
            <button className={classes.Button2} onClick={this.buttonHandler}>
              Switch to {isSignUp ? "Login" : "Register"}
            </button>
          </div>
        )}
      </div>
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
    { auth }
  )(Auth)
);
