function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location = "/";
}

export const authActions = {
    logout
};