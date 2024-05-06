import axios from "axios";
import baseUrl from "../function/BaseUrl";


class AuthService {
    #serviceBaseUrl;

    constructor() {
        this.#serviceBaseUrl = baseUrl() + "/auth";
    }

    signUp(name, email, password) {
        return axios
            .post(this.#serviceBaseUrl + "/registration", {
                name,
                email,
                password
            })
            .then((response) => {
                return response;
            }
        );
    }
    
    logIn(email, password) {
        return axios
            .post(this.#serviceBaseUrl + "/login", {
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
    }

    logOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRoles");
        localStorage.setItem("isAuthenticated", JSON.stringify(false));
        window.location.reload();
    }
    
    checkAuthentication() {
       return JSON.parse(localStorage.getItem("isAuthenticated"));
    }
}

export default AuthService;
