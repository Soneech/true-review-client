import axios from "axios";
import authHeader from "./AuthHeader";
import baseUrl from "./BaseUrl";

const BASE_URL = baseUrl();

const getAllReviews = () => {
    return axios.get(BASE_URL + "/reviews", {headers: authHeader()});
}

const getReveiw = (reviewId) => {
    return axios.get(BASE_URL + "/reviews/" + reviewId, {headers: authHeader()});
}

const getUserReviews = (userId) => {
    return axios.get(BASE_URL + "/user/" + userId + "/reviews", {headers: authHeader()})
}

const ReviewSerivce = {
    getAllReviews,
    getReveiw,
    getUserReviews
}

export default ReviewSerivce;