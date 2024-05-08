import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import ReviewItem from "./ReviewItem";

import ReviewService from "../../service/ReviewService";
import CategoryService from "../../service/CategoryService";

import isAdminUser from "../../function/IsAdmin";


const ItemsList = (props) => {
    const {id} = useParams(); // category id, if for category
    const [category, setCategory] = useState("");

    const [items, setItems] = useState([]);
    
    const reviewService = new ReviewService();
    const categoryService = new CategoryService();

    const isAdmin = isAdminUser();

    useEffect(() => {
        if (props.forCategory) {
            categoryService.getCategory(id).then(
                (response) => {
                    setCategory(response.data);
                },
                (error) => {
                    console.log(error);
                }
            );

            reviewService.getItemsForCategory(id).then(
                (response) => {
                    setItems(response.data);
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            reviewService.getItems().then(
                (response) => {
                    setItems(response.data);
                },
                (error) => {
                    console.log(error);
                }
            );
        }
        
    }, []);


    return (
        <div className="Reviews-list-block Content-block">
            <div className="Reviews-list">
                {props.forCategory && category.name != null &&
                    <div className="Reviews-category-block">
                        <p className="Page-header">Предметы отзывов категории: {category.name}</p>
                        {isAdmin &&
                            <Link to={{ pathname: `/categories/${category.id}/update` }}><button className="Action-btn Update-category-button">Изменить</button></Link>
                        }
                    </div>
                }

                {!props.forCategory &&
                    <p className="Page-header">Предметы отзывов</p>
                }
                
                {items &&
                    <div className="Reviews-list Wide-block">
                        {items.map((item, index) => (
                            <div>
                                <ReviewItem index={index} item={item}/>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )

}

export default ItemsList;