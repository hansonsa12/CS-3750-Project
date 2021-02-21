function logout() {
    localStorage.clear();
    window.location = "/";
}

export const authActions = {
    logout
};