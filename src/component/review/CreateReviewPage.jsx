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

    const navigate = useNavigate();

    useEffect(() => {
        CategoriesSerivce.getAllCategories().then(
            (response) => {
                setCategories(response.data);
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

        try {
          await ReviewSerivce.createReview(review).then(
            (response) => {
                console.log(response);
                navigate("/");
                window.location.reload();
            },
            (error) => {
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
                <form>
                    <div>
                        <input name="object_name" placeholder="Предмет отзыва" value={objectName} onChange={(event) => setObjectName(event.target.value)}/>
                    </div>

                    <div>
                        <input type="radio" name="rating" placeholder="1" value={rating} onChange={(event) => setRating(event.target.value)}/>
                        <input type="radio" name="rating" placeholder="2" value={rating} onChange={(event) => setRating(event.target.value)}/>
                        <input type="radio" name="rating" placeholder="3" value={rating} onChange={(event) => setRating(event.target.value)}/>
                        <input type="radio" name="rating" placeholder="4" value={rating} onChange={(event) => setRating(event.target.value)}/>
                        <input type="radio" name="rating" placeholder="5" value={rating} onChange={(event) => setRating(event.target.value)}/>
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

                    <button type="submit" className="Action-btn">Зарегистрироваться</button>
                </form>
            </div>
        </div>
      )
}

export default CreateReviewPage;