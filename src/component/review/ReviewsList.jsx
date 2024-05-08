import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import ReviewBlock from "./ReviewBlock";

import ReviewSerivce from "../../service/ReviewService";
import CategoryService from "../../service/CategoryService";
import UserService from "../../service/UserService";

import isAdminUser from "../../function/IsAdmin";


const ReviewsList = (props) => {
    const {id} = useParams();  // user or item

    const [user, setUser] = useState("");
    const [item, setItem] = useState("");

    const [reviews, setReviews] = useState([]);

    const isAdmin = isAdminUser();

    const reviewService = new ReviewSerivce();
    const categoryService = new CategoryService();
    const userService = new UserService();

    useEffect(() => {
        if (props.forUser) {
            userService.getUser(id).then(
                (response) => {
                    setUser(response.data);
                },
                (error) => {
                    console.log(error);
                }
            );

            reviewService.getUserReviews(id).then(
                (response) => {
                    setReviews(response.data);
                },
                (error) => {
                    console.log(error);
                }
            );
        } else if(props.forItem) {
            reviewService.getItem(id).then(
                (response) => {
                    setItem(response.data);
                },
                (error) => {
                    console.log(error);
                }
            );

            reviewService.getReviewsForItem(id).then(
                (response) => {
                    setReviews(response.data);
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
                {props.forUser &&
                    <p className="Page-header">Отзывы от {user.name}</p>
                }

                {props.forItem &&
                    <div>
                        <p className="Page-header">Отзывы на {item.name}</p>
                        <p>Всего отзывов: {item.reviews_count}</p>
                        <p>Средняя оценка: {Number(item.middle_rating).toFixed(1)}</p>
                    </div>
                    

                }

                {reviews &&
                    <div className="Reviews-list Wide-block">
                        {reviews.map((review, index) => (
                            <div>
                                {props.forUser && <ReviewBlock index={index} review={review} withAuthor={false}/>}
                                {props.forItem && <ReviewBlock index={index} review={review} withAuthor={true}/>}
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default ReviewsList;