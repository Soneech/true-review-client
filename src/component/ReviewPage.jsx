import React, {useState, useEffect} from "react"
import { Link, useParams, useNavigate } from "react-router-dom";
import ReviewSerivce from "../service/ReviewService";

import AuthService from "../service/AuthService";

const ReviewPage = () => {
    const {id} = useParams();
    const [review, setReview] = useState([]);

    const navigate = useNavigate();

    const currentUserId = localStorage.getItem("userId");
    const roles = localStorage.getItem("userRoles");
    const adminRole = "ROLE_ADMIN"

    useEffect(() => {
        ReviewSerivce.getReveiw(id).then(
            (response) => {
                setReview(response.data);
                console.log(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
      }, []);

      const deleteReview = () => {
        ReviewSerivce.deleteReview(id).then(
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

      const editReview = () => {

      }

      const logOut = () => {
        AuthService.logout();
        navigate("/");
        window.location.reload();
    };

      return(
        <div>
            {review.object_name != null &&
                <div className="Review-block">
                    {currentUserId == review.author.id &&
                        <p>Ваш отзыв</p>
                    }
                    {currentUserId != review.author.id &&
                        <p>Автор: {review.author.name}</p>
                    }

                    <p>Предмет отзыва: {review.object_name}</p>
                    <p>Категория: <Link to={{ pathname: `/categories/${review.category.id}` }} className="Categories-link">{review.category.name}</Link></p>
                    <p>Оценка: {review.rating}</p>   
                    
                    {review.advantages &&
                        <div>
                            <p>Достоинства:</p>
                            <p>{review.advantages}</p> 
                        </div>
                    }
                                    
                    {review.disadvantages &&
                        <div>
                            <p>Недостатки:</p>
                            <p>{review.disadvantages}</p> 
                        </div>
                    }

                    {review.note &&
                        <div>
                            <p>Комментарий:</p>
                            <p>{review.note}</p> 
                        </div>
                    }

                    {(currentUserId == review.author.id || roles.includes(adminRole)) &&
                        <div>
                            <button onClick={editReview} className="Action-btn">Редактировать</button>
                            <button onClick={deleteReview} className="Action-btn">Удалить</button>
                        </div>
                    }
                </div>
            }
            
        </div>
      )
}

export default ReviewPage;