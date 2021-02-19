import React, { Component } from "react";
import axios from 'axios';
import { authActions } from "../helpers/authActions";

export default class AppContainer extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        const user = JSON.parse(localStorage["user"]);
        return (
            <div>
                <h1>Welcome, {`${user?.firstName} ${user?.lastName}`}!</h1>
                <button
                    onClick={() => {
                        authActions.logout();
                    }}
                >
                    Logout
                </button>
            </div>
        );
    }
}
