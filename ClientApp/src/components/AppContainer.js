import React, { Component } from "react";
export default class AppContainer extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() { }
    render() {
        return (
            <div>
                <h1>Welcome, {`${user?.firstName} ${user?.lastName}`}!</h1>
                <button
                    onClick={() => {
                        localStorage.removeItem("authToken");
                        localStorage.removeItem("user");
                        window.location = "/";
                    }}
                >
                    Logout
        </button>
            </div>
        );
    }
}
