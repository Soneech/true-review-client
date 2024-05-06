import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CategoryService from "../../service/CategoryService";
import AuthService from "../../service/AuthService";

import isAdminUser from "../../function/IsAdmin";


const UpdateCategoryPage = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    let {id} = useParams();

    const navigate = useNavigate();
    const isAdmin = isAdminUser();

    const categoryService = new CategoryService();
    const authService = new AuthService();
    
    useEffect(() => {
        if (!isAdmin) {
            navigate("/");
        } else {
            categoryService.getCategory(id).then(
                (response) => {
                    setCategory(response.data);
                    setName(response.data.name);
                    console.log(response.data);
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
        navigate("/");
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            await categoryService.updateCategory(id, name).then(
                (response) => {
                    console.log(response);
                    navigate("/categories/" + id + "/reviews");
                },
                (error) => {
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
                            <input name="name" placeholder="Название" value={name} onChange={(event) => setName(event.target.value)}/>
                        </div>

                        <button type="submit" className="Action-btn">Обновить</button>
                    </form>
                </div>
            </div>
        </div>
      )

}

export default UpdateCategoryPage;