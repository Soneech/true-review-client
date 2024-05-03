import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewItem from "./ReviewItem";
import ReviewSerivce from "../service/ReviewService";
import CategoriesService from "../service/CategoriesService";

const ReviewsList = () => {
    const {id} = useParams();
    const [category, setCategory] = useState([]);
    const [reviews, setReviews] = useState([]);

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
                <p>Отзывы категории: {category.name}</p>
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