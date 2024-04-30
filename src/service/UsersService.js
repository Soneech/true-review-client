import axios from "axios";
import authHeader from "./AuthHeader";
import baseUrl from "./BaseUrl";

const BASE_URL = baseUrl() + "/users";

const getAllUsers = () => {
    return axios.get(BASE_URL, {headers: authHeader()});
}

const getUser = (userId) => {
    return axios.get(BASE_URL + "/" + userId, {headers: authHeader()});
}

const UsersService = {
    getAllUsers,
    getUser
};

export default UsersService;