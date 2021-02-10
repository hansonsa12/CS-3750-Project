import React, { Component } from "react";
export default class AppContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>Welcome, {`${user?.first_name} ${user?.last_name}`}!</h1>
        <h1>TEST</h1>
        <button
          onClick={() => {
            localStorage.removeItem("authToken");
            window.location = "/";
          }}
        >
          Logout
        </button>
      </div>
    );
  }
}
