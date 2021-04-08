// reference: https://www.youtube.com/watch?v=XuFDcZABiDQ
import axios from "axios";
import React, { Component, createContext } from "react";
import { AccountType } from "../helpers/helpers";

const initialState = {
    user: {
        // setting initial state like this makes for better autocompletion
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        birthDay: undefined,
        accountType: undefined,
        phoneNumber: undefined,
        bio: undefined,
        address: {
            addressId: undefined,
            addressOne: undefined,
            addressTwo: undefined,
            city: undefined,
            state: undefined,
            zipCode: undefined,
            userId: undefined
        },
        profilePicName: undefined,
        // fileUploads: [{}],
        profileLinks: [
            {
                profileLinkId: undefined,
                link: undefined,
                userId: undefined
            }
        ]
    },
    loading: true
};

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

    setResponseToken = res => {
        localStorage.setItem("authToken", res.data.authToken);
        window.location = "/";
    };

    setUser = async () => {
        try {
            const user = await this.getCurrentUserInfo();
            this.setState({ user, loading: false });
        } catch (err) {
            console.log(err);
        }
    };

    getCurrentUserInfo = async () => {
        try {
            const authHeader = this.authHeader();
            if (!authHeader) return null;

            const res = await axios.get("api/users/current", authHeader);

            return res.data;
        } catch (err) {
            console.error(err);
            localStorage.removeItem("authToken");
            return null;
        }
    };

    login = ({ email, password }) => {
        return axios
            .post("api/auth/login", { email, password })
            .then(res => {
                this.setResponseToken(res);
            })
            .catch(err => {
                alert(`${err.message}:\n${err.response.data.error}`);
            });
    };

    logout = () => {
        localStorage.removeItem("authToken");
        window.location = "/";
    };

    signup = userInfo => {
        axios
            .post("api/auth/signup", userInfo)
            .then(res => {
                this.setResponseToken(res);
            })
            .catch(err => {
                alert(err.message);
                console.error(err.message);
            });
    };

    authHeader = () => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) return null;
        return { headers: { Authorization: `Bearer ${authToken}` } };
    };

    updateUser = user => {
        this.setState({ user });
    };

    render() {
        const { user, loading } = this.state;
        const { children } = this.props;

        return (
            !loading && (
                <AuthContext.Provider
                    value={{
                        user,
                        login: this.login,
                        logout: this.logout,
                        signup: this.signup,
                        authHeader: this.authHeader(),
                        isStudent: user?.accountType === AccountType.STUDENT,
                        isInstructor:
                            user?.accountType === AccountType.INSTRUCTOR,
                        updateUser: this.updateUser
                    }}
                >
                    {children}
                </AuthContext.Provider>
            )
        );
    }
}

export default AuthProvider;
