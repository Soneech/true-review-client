import axios from "axios";
import authHeader from "../function/AuthHeader";
import baseUrl from "../function/BaseUrl";

class ReviewService {
    #serviceBaseUrl;

    constructor() {
        this.#serviceBaseUrl = baseUrl();
    }

    getAllReviews(useHeader) {
        if (useHeader) {
            return axios.get(this.#serviceBaseUrl + "/reviews", {headers: authHeader()});
        }
        return axios.get(this.#serviceBaseUrl + "/reviews");
    }
    
    getReveiw(reviewId) {
        return axios.get(this.#serviceBaseUrl + "/reviews/" + reviewId, {headers: authHeader()});
    }
    
    getUserReviews(userId) {
        return axios.get(this.#serviceBaseUrl + "/users/" + userId + "/reviews", {headers: authHeader()});
    }
    
    getReviewsForCategory(categoryId) {
        return axios.get(this.#serviceBaseUrl + "/categories/" + categoryId + "/reviews", {headers: authHeader()});
    }
    
    deleteReview(reviewId) {
        return axios.delete(this.#serviceBaseUrl + "/reviews/" + reviewId, {headers: authHeader()});
    }
    
    createReview(review) {
        return axios.post(this.#serviceBaseUrl + "/reviews", review, {headers: authHeader()});
    }

    createReviewAndItem(review) {
        return axios.post(this.#serviceBaseUrl + "/reviews-items", review, {headers: authHeader()});
    }

    searchReviewItems(itemName) {
        return axios.get(this.#serviceBaseUrl + "/items/search", {
            headers: authHeader(),
            params: {
                name: itemName
            }
        });
    }
}


export default ReviewService;