import axios from "axios";
import authHeader from "../function/AuthHeader";
import baseUrl from "../function/BaseUrl";

class CategoryService {
    #serviceBaseUrl;

    constructor() {
        this.#serviceBaseUrl = baseUrl() + "/categories";
    }

    getAllCategories() {
        return axios.get(this.#serviceBaseUrl, {headers: authHeader()});
    }
    
    getCategory(categoryId) {
        return axios.get(this.#serviceBaseUrl + "/" + categoryId, {headers: authHeader()});
    }
    
    updateCategory(categoryId, name) {
        return axios.patch(this.#serviceBaseUrl + "/" + categoryId, {name}, {headers: authHeader()});
    }
}

export default CategoryService;
