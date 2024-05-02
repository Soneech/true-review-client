import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoiesSerivce from "../service/CategoriesService";
import ReviewSerivce from "../service/ReviewService";

const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        CategoiesSerivce.getAllCategories().then(
            (response) => {
                setCategories(response.data);
                console.log(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
      }, []);

    useEffect(() => {
        ReviewSerivce.getAllReviews().then(
            (response) => {
                setReviews(response.data);
                console.log(response);
            },
            (error) => {
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
                            <div key={index} className="Reviews-item">
                                 <Link to={{ pathname: `/reviews/${review.id}` }} className="Reviews-link"><p>{review.object_name}</p></Link>
                                 <p>{review.rating}</p>
                            </div>
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
                                <Link to={{ pathname: `/categories/${category.id}` }} className="Categories-link"><p>{category.name}</p></Link>
                            </div>
                        ))}
                    </div>
                }
            </div>
            
        </div>
    )
}

export default HomePage;