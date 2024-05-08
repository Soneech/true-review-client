import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import ReviewSerivce from "../../service/ReviewService";
import CategoryService from "../../service/CategoryService";
import AuthService from "../../service/AuthService";


const CreateReviewPage = () => {
    const [itemName, setItemName] = useState(null);
    var [searchItemName, setSearchItemName] = useState(null);
    var [itemId, setItemId] = useState(null);

    const [rating, setRating] = useState("");
    const [advantages, setAdvantages] = useState("");
    const [disadvantages, setDisadvantages] = useState("");
    const [note, setNote] = useState("");
    const [categoryId, setCategoryId] = useState("");

    var [isChecked, setIsChecked] = useState(false);

    const [categories, setCategories] = useState([]);
    var [items, setItems] = useState([]);

    const reviewService = new ReviewSerivce();
    const categoryService = new CategoryService();
    const authService = new AuthService();

    const isAuth = authService.checkAuthentication();

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate("/");
        }

        categoryService.getAllCategories().then(
            (response) => {
                setCategories(response.data);
                setCategoryId(response.data[0].id);
               
                console.log(response.data);
            },
            (error) => {
                authService.logOut();
                navigate("/");
                console.log(error);
            }
        );
      }, []);

    const handleCreateReview = async (event) => {
        event.preventDefault();

        if (itemName != null) {
            createReviewAndNewItem();
        } else if (itemId != null) {
            createReview();
        }
    };

    const createReviewAndNewItem = async () => {
        let review = {
            item_name: itemName,
            rating: rating, 
            advantages: advantages,
            disadvantages: disadvantages,
            note: note,
            category_id: categoryId
        };

        try {
            await reviewService.createReviewAndItem(review).then(
            (response) => {
                navigate("/");
                window.location.reload();
            },
            (error) => {
                if (error.response.status == 401 || error.response.status == 405 || error.response.status == 403 ) {
                    navigate("/");
                    authService.logOut();
                }
                console.log(error);
            }
            );
        } catch (err) {
            console.log(err);
        }
    };

    const createReview = async () => {
        let review = {
            item_id: itemId,
            rating: rating, 
            advantages: advantages,
            disadvantages: disadvantages,
            note: note,
            category_id: categoryId
        };

        try {
            await reviewService.createReview(review).then(
            (response) => {
                navigate("/");
                window.location.reload();
            },
            (error) => {
                if (error.response.status == 401 || error.response.status == 405 || error.response.status == 403 ) {
                    navigate("/");
                    authService.logOut();
                }
                console.log(error);
            }
            );
        } catch (err) {
            console.log(err);
        }
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);

        if (isChecked) {
            setItemId(null);
        } else {
            setItemName(null);
        }
    };

    const searchReviewItems = async (event) => {
        event.preventDefault();

        try {
            await reviewService.searchReviewItems(searchItemName).then(
            (response) => {
                setItems(response.data);
                setItemId(response.data[0].id);
            },
            (error) => {
                if (error.response.status == 401 || error.response.status == 405 || error.response.status == 403 ) {
                    navigate("/");
                    authService.logOut();
                }
                console.log(error);
            }
            );
        } catch (err) {
            console.log(err);
        }
    };

      return (
        <div className="Content-block">
            <p className="Page-header">Создание отзыва</p>

            <div className="Styled-block Wide-block Create-review-block">
                {!isChecked &&
                    <div>
                        <div className="Search-review-item-block">
                            <input name="search" placeholder="Предмет отзыва" value={searchItemName} onChange={(event) => setSearchItemName(event.target.value)}/>
                            <button className="Action-btn" onClick={searchReviewItems}>Найти</button>
                        </div>

                        {items.length != 0 &&
                            <div className="Found-items-block">
                                <p>Нашли по вашему запросу:</p>
                                <select onChange={(event) => setItemId(event.target.value)}>
                                    { items.map((item, index) => 
                                        <option key={index} value={item.id} >{item.name}</option>) 
                                    }
                                </select>
                            </div>
                        }
                    </div>
                    
                }

                <form onSubmit={handleCreateReview} className="Create-review-form">
                    {isChecked &&
                        <div>
                            <input name="object_name" placeholder="Предмет отзыва" value={itemName} onChange={(event) => setItemName(event.target.value)}/>
                        </div>
                    }

                    <p>Не нашли нужное?</p>
                    <div className="Add-item-radio-block">
                        <p>Добавить в каталог: </p>
                        <input type="checkbox" id="add-item-radio" className="Add-item-radio" onChange={handleCheckboxChange}/>
                    </div>
                    
                    <div className="Select-category-block">
                        <p>Выберите категорию:</p>
                        <select onChange={(event) => setCategoryId(event.target.value)}>
                            { categories.map((category, index) => 
                                <option key={index} value={category.id} >{category.name}</option>) 
                            }
                        </select>
                    </div>
                    
                    
                    <div className="Rating-block">
                        <p>Поставьте оценку:</p>
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