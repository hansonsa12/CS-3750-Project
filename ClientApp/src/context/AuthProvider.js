// reference: https://www.youtube.com/watch?v=XuFDcZABiDQ
import React, { Component, createContext } from 'react';
import axios from 'axios';

const initialState = {
    user: null,
    loading: true,
}

// Create context
export const AuthContext = createContext(initialState);

// Provider component
class AuthProvider extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    async componentDidMount() {
        this.setUser();
    }

    setResponseToken = (res) => {
        localStorage.setItem("authToken", res.data.authToken);
        window.location = "/";
    }

    setUser = async () => {
        const user = await this.getCurrentUserInfo();
        this.setState({ user, loading: false });
    }

    getCurrentUserInfo = async () => {
        try {
            const authHeader = this.authHeader();
            if (!authHeader) return null;

            const res = await axios.get("api/users/current", { headers: authHeader });

            return res.data;

        } catch (err) {
            console.error(err);
            return null;
        }
    }

    login = ({ email, password }) => {
        return axios
            .post("api/auth/login", { email, password })
            .then(res => {
                this.setResponseToken(res);
            })
            .catch(err => {
                alert(err.message);
                console.error(err.message);
            });
    }

    logout = () => {
        localStorage.clear();
        window.location = "/";
    }

    signup = (userInfo) => {
        axios
            .post("api/auth/signup", userInfo)
            .then(res => {
                this.setResponseToken(res);
            })
            .catch(err => {
                alert(err.message);
                console.error(err.message);
            });
    }

    authHeader = () => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) return null;
        return { Authorization: `Bearer ${authToken}` };
    }

    render() {
        const { user, loading } = this.state;
        const { children } = this.props;

        return (
        !loading && <AuthContext.Provider value={{
            user,
            login: this.login,
            logout: this.logout,
            signup: this.signup,
            authHeader: this.authHeader
        }}>
            {children}
        </AuthContext.Provider>
        );
    }
}

export default AuthProvider;