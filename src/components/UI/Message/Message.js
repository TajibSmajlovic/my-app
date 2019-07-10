import React from "react";

import classes from "./Message.module.css";

const Message = props => (
  <div className={classes.Container}>
    <h1 className={classes.Message}>{props.message}</h1>
  </div>
);

export default Message;
