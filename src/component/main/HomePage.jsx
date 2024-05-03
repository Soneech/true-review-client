import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReviewItem from "../review/ReviewItem";
import CategoriesSerivce from "../../service/CategoriesService";
import ReviewSerivce from "../../service/ReviewService";
import AuthService from "../../service/AuthService";

const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        CategoriesSerivce.getAllCategories().then(
            (response) => {
                setCategories(response.data);
                console.log(response.data);
            },
            (error) => {
                AuthService.logout();
                console.log(error);
            }
        );
      }, []);

    useEffect(() => {
        ReviewSerivce.getAllReviews(true).then(
            (response) => {
                setReviews(response.data);
                console.log(response);
            },
            (error) => {
                AuthService.logout();
                console.log(error);
            }
        )
    }, []);

    return (
        <div className="Home-content">
            <div className="Reviews-block">
                <h3>Лента отзывов</h3>
                
                {reviews &&
                    <div className="Reviews-list">
                        {reviews.map((review, index) => (
                            <ReviewItem index={index} review={review}/>
                        ))}
                    </div>
                }
                
            </div>
            
            <div className="Categories-block">
                <h3>Категории отзывов</h3>

                {categories && 
                    <div className="Categories-list">
                        {categories.map((category, index) => (
                            <div key={index} className="Categories-item">
                                <Link to={{ pathname: `/categories/${category.id}/reviews` }} className="Categories-link"><p>{category.name}</p></Link>
                            </div>
                        ))}
                    </div>
                }
            </div>
            
        </div>
    )
}

export default HomePage;