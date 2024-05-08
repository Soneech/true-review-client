import React, {useState, useEffect} from "react"
import { Link, useParams, useNavigate } from "react-router-dom";
import UserService from "../../service/UserService";
import AuthService from "../../service/AuthService";

const UserProfilePage = () => {
    const {id} = useParams();
    const [user, setUser] = useState([]);

    const navigate = useNavigate();
    const userSerivce = new UserService();
    const authService = new AuthService();

    const errorPath = "/access/error";

    useEffect(() => {
        userSerivce.getUser(id).then(
            (response) => {
                setUser(response.data);
                console.log(response.data);
            },
            (error) => {
                if (error.response.status == 401 || error.response.status == 405) {
                    authService.logOut();
                } else if (error.response.status == 404) {
                    navigate("/");
                } else {
                    navigate(errorPath);
                }
                
                console.log(error);
            }
        );
      }, []);
    
    const logOut = () => {
        navigate("/");
        authService.logOut();
        
    };

    return (
        <div className="Content-block">
            <p className="Page-header">Профиль</p>

            {user.name != null &&
                <div className="User-info-div Styled-block">
                    <p>Имя: {user.name}</p>
                    {user.email && <p>Почта: {user.email}</p>}
                    
                    <Link to={{ pathname: `/users/${user.id}/reviews` }}className="Default-link"><p>Написано отзывов: {user.reviews_count}</p></Link>

                    <p>Привелегии:</p>
                    <ul className="Roles-list">
                        {user.roles?.map((role, index) => (
                            <li key={index}>{role.name == "ROLE_USER" ? "Обычный пользователь" : "Администратор"}<br/></li>
                        ))}
                    </ul>

                    {id == localStorage.getItem("userId") &&
                        <button className="Action-btn" onClick={logOut}>Выйти</button>
                    }
                </div>
            }
        </div>
        
    )
}

export default UserProfilePage;