import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ChatItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${this.props.user ? this.props.user : ""}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{this.props.msg}</div>
          <div className="chat__meta">
          </div>
        </div>
      </div>
    );
  }
}

ChatItem.propTypes = {
    user: PropTypes.user,
    msg: PropTypes.msg
}