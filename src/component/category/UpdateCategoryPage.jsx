import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CategoryService from "../../service/CategoryService";
import AuthService from "../../service/AuthService";

import isAdminUser from "../../function/IsAdmin";


const UpdateCategoryPage = () => {
    let {id} = useParams();

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");

    const [fieldsErrors, setErrors] = useState([]);
    const [errorMessage, setMessage] = useState("");


    const navigate = useNavigate();
    const isAdmin = isAdminUser();

    const categoryService = new CategoryService();
    const authService = new AuthService();

    const errorPath = "/operations/error";
    
    useEffect(() => {
        if (!isAdmin) {
            navigate(errorPath);
        } else {
            categoryService.getCategory(id).then(
                (response) => {
                    setCategory(response.data);
                    setName(response.data.name);
                },
                (error) => {
                    if (error.response.status == 401 || error.response.status == 405) {
                        logOut();
                    }
                    console.log(error);
                }
            );
        }
    }, []);
    
    const logOut = () => {
        authService.logOut();
        navigate(errorPath);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            await categoryService.updateCategory(id, name).then(
                (response) => {
                    navigate("/categories/" + id + "/items");
                },
                (error) => {
                    if (error.response.status == 400) {
                        setErrors(error.response.data.fields_errors);
                        setMessage(error.response.data.message);
                    }
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
      };

      return (
        <div className="Content-block">
            <div>
                <p className="Page-header">Обновление категории '{category.name}'</p>

                <div className="Styled-block Wide-block Update-category-block">
                    <form onSubmit={handleUpdate}>
                        <div>
                            {fieldsErrors.name && <p className="Error-message Form-input-error-message Category-update-error-message">{fieldsErrors.name[0]}</p>}
                            <input name="name" placeholder="Название" value={name} onChange={(event) => setName(event.target.value)}/>
                        </div>

                        {errorMessage && <p className="Error-message Form-main-error-message">{errorMessage}</p>}
                        <button type="submit" className="Action-btn">Обновить</button>
                    </form>
                </div>
            </div>
        </div>
      )

}

export default UpdateCategoryPage;