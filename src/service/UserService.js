import axios from "axios";
import authHeader from "../function/AuthHeader";
import baseUrl from "../function/BaseUrl";

class UserService {
    #serviceBaseUrl;

    constructor() {
        this.#serviceBaseUrl = baseUrl() + "/users";
    }

    getAllUsers() {
        return axios.get(this.#serviceBaseUrl, {headers: authHeader()});
    }

    getUser(userId) {
        return axios.get(this.#serviceBaseUrl + "/" + userId, {headers: authHeader()});
    }
}

export default UserService;