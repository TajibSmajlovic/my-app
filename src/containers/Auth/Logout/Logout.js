import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { logOut, setRoute } from "../../../store/actions/authActions";

class Logout extends React.Component {
  componentDidMount() {
    this.props.logOut();
    this.props.setRoute("/");
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default connect(
  null,
  { logOut, setRoute }
)(Logout);
