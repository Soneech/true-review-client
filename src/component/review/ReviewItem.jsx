import React from "react";
import { Link } from "react-router-dom";

const ReviewItem = (props) => {
    const currentUserId = localStorage.getItem("userId");

    const getRating = () => {
        let starsElements = [];
        let rating = props.review.rating;

        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsElements.push(<span class="Active-star"></span>);
            } else {
                starsElements.push(<span></span>);
            }
        }
        return starsElements;
    }

    return (
        <div key={props.index} className="Reviews-item">
            <Link to={{ pathname: `/reviews/${props.review.id}` }} className="Reviews-link"><p>{props.review.object_name}</p></Link>
            
            <div className="Rating-result">{getRating()}</div>
            
            {currentUserId == props.review.author.id &&
                <p>Ваш отзыв</p>
            }
            {currentUserId != props.review.author.id &&
                <p>Автор: {props.review.author.name}</p>
            }
        </div>
    )
}

export default ReviewItem;