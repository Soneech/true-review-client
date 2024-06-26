import React, {useState, useEffect} from "react"
import { Link, useParams, useNavigate } from "react-router-dom";

import ReviewSerivce from "../../service/ReviewService";
import AuthService from "../../service/AuthService";

import isAdminUser from "../../function/IsAdmin";
import getRatingStars from "../../function/GetRatingStars";


const ReviewPage = () => {
    const {id} = useParams();
    const [review, setReview] = useState([]);

    const navigate = useNavigate();

    const currentUserId = localStorage.getItem("userId");
    const isAdmin = isAdminUser();

    const reviewService = new ReviewSerivce();
    const authService = new AuthService();

    useEffect(() => {
        reviewService.getReveiw(id).then(
            (response) => {
                setReview(response.data);
                console.log(response.data);
            },
            (error) => {
                console.log(error);
                logOut();
            }
        );
      }, []);

      const deleteReview = () => {
        reviewService.deleteReview(id).then(
            (response) => {
                console.log(response);
                navigate("/");
            },
            (error) => {
                console.log(error);
                logOut();
            }
        )
      }

      const logOut = () => {
        authService.logOut();
        navigate("/");
    };

      return(
        <div className="Content-block">
            {review.review_item != null &&
                <div>
                    <p className="Page-header">Отзыв на {review.review_item.name}</p>

                    <div className="Styled-block Review-block">
                        <div>
                            {currentUserId == review.author.id &&
                                <p>Ваш отзыв</p>
                            }
                            {currentUserId != review.author.id &&
                                <p>Отзыв от <Link to={{ pathname: `/users/${review.author.id}` }} className="Default-link">{review.author.name}</Link></p>
                            }
                        </div>
                        
                        <div className="Review-category-block">
                            <p className="Bold-point">Категория:</p>
                            <Link to={{ pathname: `/categories/${review.review_item.category.id}/items` }} className="Default-link">{review.review_item.category.name}</Link>
                        </div>

                        <div className="Review-rating-stars-block">
                            <p className="Bold-point">Оценка: </p>
                            <div className="Rating-result">{getRatingStars(review.rating)}</div>
                        </div>
                           
                        
                        {review.advantages &&
                            <div className="Advantages-block Review-text-block">
                                <p className="Bold-point">Достоинства:</p>
                                <p className="Review-text">{review.advantages}</p> 
                            </div>
                        }
                                        
                        {review.disadvantages &&
                            <div className="Disadvantages-block Review-text-block">
                                <p className="Bold-point">Недостатки:</p>
                                <p className="Review-text">{review.disadvantages}</p> 
                            </div>
                        }

                        {review.note &&
                            <div className="Note-block Review-text-block">
                                <p className="Bold-point">Комментарий:</p>
                                <p className="Review-text">{review.note}</p> 
                            </div>
                        }
                    </div>

                    {(currentUserId == review.author.id || isAdmin) &&
                        <div className="Review-action-btns-block">
                            <button onClick={deleteReview} className="Action-btn">Удалить</button>
                        </div>
                    }
                </div>
            }
        </div>
      )
}

export default ReviewPage;