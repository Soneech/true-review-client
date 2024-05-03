import React from "react";
import { useEffect, useState } from "react";
import CategoriesSerivce from "../../service/CategoriesService";
import AuthService from "../../service/AuthService";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCategoryPage = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    let {id} = useParams();

    const navigate = useNavigate();

    const adminRole = "ROLE_ADMIN";
    const roles = localStorage.getItem("userRoles");

    useEffect(() => {
        if (roles == null || !roles.includes(adminRole)) {
            navigate("/");
        }
        else {
            CategoriesSerivce.getCategory(id).then(
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
        AuthService.logout();
        navigate("/");
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            await CategoriesSerivce.updateCategory(id, name).then(
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
        <div>
            <div>
                <p>Обновление категории '{category.name}'</p>

                <form onSubmit={handleUpdate}>
                    <div>
                        <input name="name" placeholder="Название" value={name} onChange={(event) => setName(event.target.value)}/>
                    </div>

                    <button type="submit" className="Action-btn">Обновить</button>
                </form>
            </div>
        </div>
      )

}

export default UpdateCategoryPage;