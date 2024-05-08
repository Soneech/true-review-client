import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryService from "../../service/CategoryService";

const CategoriesList = () => {
    const [categories, setCategories] = useState([]);

    const categoryService = new CategoryService();

    useEffect(() => {
        categoryService.getAllCategories().then(
            (response) => {
                setCategories(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    return (
        <div className="Categories-list-block Content-block">
            <p className="Page-header">Категории отзывов</p>

            {categories && 
                <div className="Categories-main-list">
                    {categories.map((category, index) => (
                        <div key={index} className="Styled-block Category-block">
                            <Link to={{ pathname: `/categories/${category.id}/items` }} className="Default-link"><p>{category.name}</p></Link>
                        </div>
                    ))}
                </div>
            }
        </div>
    )

}

export default CategoriesList;