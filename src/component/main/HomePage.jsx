import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ReviewItem from "../review/ReviewItem";

import CategoryService from "../../service/CategoryService";
import ReviewSerivce from "../../service/ReviewService";
import AuthService from "../../service/AuthService";


const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [reviews, setReviews] = useState([]);

    const reviewService = new ReviewSerivce();
    const categoryService = new CategoryService();
    const authService = new AuthService();

    useEffect(() => {
        categoryService.getAllCategories().then(
            (response) => {
                setCategories(response.data);
                console.log(response.data);
            },
            (error) => {
                authService.logOut();
                console.log(error);
            }
        );
      }, []);

    useEffect(() => {
        reviewService.getAllReviews(true).then(
            (response) => {
                setReviews(response.data);
                console.log(response);
            },
            (error) => {
                authService.logOut();
                console.log(error);
            }
        )
    }, []);

    return (
        <div className="Home-content Content-block">
            <div className="Reviews-block">
                <h3>Лента отзывов</h3>
                
                {reviews &&
                    <div className="Reviews-main-list">
                        {reviews.map((review, index) => (
                            <ReviewItem index={index} review={review}/>
                        ))}
                    </div>
                }
                
            </div>
            
            <div className="Categories-block">
                <h3>Категории отзывов</h3>

                {categories && 
                    <div className="Categories-list Styled-block">
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