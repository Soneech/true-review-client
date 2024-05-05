import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import ReviewSerivce from "../../service/ReviewService";
import CategoriesSerivce from "../../service/CategoriesService";
import AuthService from "../../service/AuthService";

const CreateReviewPage = () => {
    const [objectName, setObjectName] = useState("");
    const [rating, setRating] = useState("");
    const [advantages, setAdvantages] = useState("");
    const [disadvantages, setDisadvantages] = useState("");
    const [note, setNote] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const [categories, setCategories] = useState([]);
    const isAuth = AuthService.checkAuthentication();

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate("/");
        }

        CategoriesSerivce.getAllCategories().then(
            (response) => {
                setCategories(response.data);
                setCategoryId(response.data[0].id);
               
                console.log(response.data);
            },
            (error) => {
                AuthService.logout();
                navigate("/");
                console.log(error);
            }
        );
      }, []);

      const handleCreateReview = async (event) => {
        event.preventDefault();
        let review = {
            object_name: objectName,
            rating: rating, 
            advantages: advantages,
            disadvantages: disadvantages,
            note: note,
            category_id: categoryId
        };

        console.log(review);

        try {
          await ReviewSerivce.createReview(review).then(
            (response) => {
                console.log(response);
                navigate("/");
                window.location.reload();
            },
            (error) => {
                if (error.response.status == 401 || error.response.status == 405 || error.response.status == 403 ) {
                    navigate("/");
                    AuthService.logout();
                }
                console.log(error);
            }
          );
        } catch (err) {
            console.log(err);
        }
      };

      return (
        <div>
            <p>Создание отзыва</p>
            <div>
                <form onSubmit={handleCreateReview}>
                    <select onChange={(event) => setCategoryId(event.target.value)}>
                        { categories.map((category, index) => 
                            <option key={index} value={category.id} >{category.name}</option>) 
                        }
                    </select>

                    <div>
                        <input name="object_name" placeholder="Предмет отзыва" value={objectName} onChange={(event) => setObjectName(event.target.value)}/>
                    </div>

                    <div className="Rating-block">
                        <div className="Rating-area">
                            <input type="radio" id="star-5" name="rating" value="5" onChange={(event) => setRating(event.target.value)}/>
                            <label for="star-5" title="Оценка «5»"></label>
                            
                            <input type="radio" id="star-4" name="rating" value="4" onChange={(event) => setRating(event.target.value)}/>
                            <label for="star-4" title="Оценка «4»"></label>
                                
                            <input type="radio" id="star-3" name="rating" value="3" onChange={(event) => setRating(event.target.value)}/>
                            <label for="star-3" title="Оценка «3»"></label>

                            
                            <input type="radio" id="star-2" name="rating" value="2" onChange={(event) => setRating(event.target.value)}/>
                            <label for="star-2" title="Оценка «2»"></label>

                            <input type="radio" id="star-1" name="rating" value="1" onChange={(event) => setRating(event.target.value)}/>
                            <label for="star-1" title="Оценка «1»"></label>
                        </div>
                    </div>
                    

                    <div>
                        <textarea type="text" name="advantages" placeholder="Достоинства" value={advantages} onChange={(event) => setAdvantages(event.target.value)}/>
                    </div>

                    <div>
                        <textarea name="disadvantages" placeholder="Недостатки" value={disadvantages} onChange={(event) => setDisadvantages(event.target.value)}/>
                    </div>

                    <div>
                        <textarea name="note" placeholder="Комментарий" value={note} onChange={(event) => setNote(event.target.value)}/>
                    </div>

                    <button type="submit" className="Action-btn">Создать отзыв</button>
                </form>
            </div>
        </div>
      )
}

export default CreateReviewPage;