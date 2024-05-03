import React from "react";
import { Link } from "react-router-dom";

const ReviewItem = (props) => {
    const currentUserId = localStorage.getItem("userId");

    return (
        <div key={props.index} className="Reviews-item">
            <Link to={{ pathname: `/reviews/${props.review.id}` }} className="Reviews-link"><p>{props.review.object_name}</p></Link>
            <p>{props.review.rating}</p>
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