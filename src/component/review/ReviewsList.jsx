import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import ReviewItem from "./ReviewItem";

import ReviewSerivce from "../../service/ReviewService";
import CategoryService from "../../service/CategoryService";

import isAdminUser from "../../function/IsAdmin";


const ReviewsList = (props) => {
    const {id} = useParams(); // user id or category id
    const [category, setCategory] = useState([]);
    const [reviews, setReviews] = useState([]);

    const isAdmin = isAdminUser();

    const reviewService = new ReviewSerivce();
    const categoryService = new CategoryService();

    useEffect(() => {
        if (props.forUser) {
            reviewService.getUserReviews(id).then(
                (response) => {
                    setReviews(response.data);
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            reviewService.getReviewsForCategory(id).then(
                (response) => {
                    setReviews(response.data);
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }, []);

    useEffect(() => {
        if (!props.forUser) {
            categoryService.getCategory(id).then(
                (response) => {
                    setCategory(response.data);
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
            {category.name != null &&
                <div className="Reviews-category-block">
                    <p className="Page-header">Отзывы категории: {category.name}</p>
                    {isAdmin &&
                        <Link to={{ pathname: `/categories/${category.id}/update` }}><button className="Action-btn Update-category-button">Изменить</button></Link>
                    }
                </div>
            }

            {reviews &&
                <div className="Reviews-list Wide-block">
                    {reviews.map((review, index) => (
                        <ReviewItem index={index} review={review}/>
                    ))}
                </div>
            }
        </div>
    </div>
    )
}

export default ReviewsList;