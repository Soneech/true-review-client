import React from "react";
import { Link } from "react-router-dom";

import getRatingStars from "../../function/GetRatingStars";

const ReviewItem = (props) => {

    return (
        <div key={props.index} className="Reviews-item Styled-block">
            <Link to={{ pathname: `/items/${props.item.id}/reviews` }} className="Default-link"><p>{props.item.name}</p></Link>
            
        
            <div className="Rating-result">{getRatingStars(Math.round(props.item.middle_rating))}</div>
            <p>Категория: <Link to={{ pathname: `/categories/${props.item.category.id}/items` }} className="Default-link">{props.item.category.name}</Link></p>
            <p>Кол-во отзывов: {props.item.reviews_count}</p>            
        </div>
    )
}

export default ReviewItem;