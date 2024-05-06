import React from "react";
import { Link } from "react-router-dom";
import getRatingStars from "../../function/GetRatingStars";


const ReviewItem = (props) => {
    const currentUserId = localStorage.getItem("userId");

    return (
        <div key={props.index} className="Reviews-item Styled-block">
            <Link to={{ pathname: `/reviews/${props.review.id}` }} className="Default-link"><p>{props.review.object_name}</p></Link>
            
            <div className="Rating-result">{getRatingStars(props.review.rating)}</div>
            
            {currentUserId == props.review.author.id &&
                <p>Ваш отзыв</p>
            }
            {currentUserId != props.review.author.id &&
                <p>Отзыв от <Link to={{ pathname: `/users/${props.review.author.id}` }} className="Default-link">{props.review.author.name}</Link></p>
            }
        </div>
    )
}

export default ReviewItem;