import axios from "axios";
import baseUrl from "./BaseUrl";

const BASE_URL = baseUrl() + "/auth";

const signup = (name, email, password) => {
    return axios
        .post(BASE_URL + "/registration", {
            name,
            email,
            password
        })
        .then((response) => {
            return response;
        }
    );
};

const login = (email, password) => {
    return axios
        .post(BASE_URL + "/login", {
            email,
            password,
        })
        .then((response) => {
            if (response.status == 200) {
                localStorage.setItem("token", JSON.stringify(response.data.token));
                localStorage.setItem("userId", JSON.stringify(response.data.user.id));

                let rolesList = [];
                response.data.user.roles.forEach((role) => {
                    rolesList.push(role.name);
                });
                
                localStorage.setItem("userRoles", JSON.stringify(rolesList));
                localStorage.setItem("isAuthenticated", JSON.stringify(true));
            }
            return response;
        });
};

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRoles");
    localStorage.setItem("isAuthenticated", JSON.stringify(false));
};

const checkAuthentication = () => {
   return JSON.parse(localStorage.getItem("isAuthenticated"));
};

const AuthService = {
  signup,
  login,
  logout,
  checkAuthentication
};

export default AuthService;