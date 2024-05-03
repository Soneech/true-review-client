import axios from "axios";
import authHeader from "./AuthHeader";
import baseUrl from "./BaseUrl";

const BASE_URL = baseUrl();

const getAllReviews = (useHeader) => {
    if (useHeader) {
        return axios.get(BASE_URL + "/reviews", {headers: authHeader()});
    }
    return axios.get(BASE_URL + "/reviews");
}

const getReveiw = (reviewId) => {
    return axios.get(BASE_URL + "/reviews/" + reviewId, {headers: authHeader()});
}

const getUserReviews = (userId) => {
    return axios.get(BASE_URL + "/user/" + userId + "/reviews", {headers: authHeader()});
}

const getReviewsForCategory = (categoryId) => {
    return axios.get(BASE_URL + "/categories/" + categoryId + "/reviews", {headers: authHeader()});
}

const deleteReview = (reviewId) => {
    return axios.delete(BASE_URL + "/reviews/" + reviewId, {headers: authHeader()});
}

const createReview = (review) => {
    return axios.post(BASE_URL + "/reviews", review, {headers: authHeader()});
}

const ReviewSerivce = {
    getAllReviews,
    getReveiw,
    getUserReviews,
    getReviewsForCategory,
    deleteReview,
    createReview
}

export default ReviewSerivce;