import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReviewItem from "./ReviewItem";
import ReviewSerivce from "../../service/ReviewService";
import CategoriesService from "../../service/CategoriesService";

const ReviewsList = () => {
    const {id} = useParams();
    const [category, setCategory] = useState([]);
    const [reviews, setReviews] = useState([]);

    const adminRole = "ROLE_ADMIN";
    const roles = localStorage.getItem("userRoles");

    useEffect(() => {
        ReviewSerivce.getReviewsForCategory(id).then(
            (response) => {
                setReviews(response.data);
                console.log(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
      }, []);

    useEffect(() => {
        CategoriesService.getCategory(id).then(
            (response) => {
                setCategory(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    return (
    <div>
        <div className="Reviews-list-block">
            {category.name != null &&
                <div>
                    <p>Отзывы категории: {category.name}</p>
                    {roles != null && roles.includes(adminRole) &&
                        <Link to={{ pathname: `/categories/${category.id}/update` }}><button className="Action-btn">Изменить</button></Link>
                    }
                </div>
            }

            {reviews &&
                <div className="Reviews-list">
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