import axios from "axios";
import authHeader from "./AuthHeader";
import baseUrl from "./BaseUrl";

const BASE_URL = baseUrl() + "/categories";

const getAllCategories = () => {
    return axios.get(BASE_URL, {headers: authHeader()});
}

const getCategory = (categoryId) => {
    return axios.get(BASE_URL + "/" + categoryId, {headers: authHeader()});
}

const CategoriesSerivce = {
    getAllCategories,
    getCategory
}

export default CategoriesSerivce;