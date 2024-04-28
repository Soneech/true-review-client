import axios from "axios";
import authHeader from "./AuthHeader";
import baseUrl from "./BaseUrl";

const BASE_URL = baseUrl() + "/users";

const getAllUsers = () => {
    return axios.get(BASE_URL, {headers: authHeader()});
}

const UsersService = {
    getAllUsers
};

export default UsersService;