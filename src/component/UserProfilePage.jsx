import React, {useState, useEffect} from "react"
import { Link, useParams, useNavigate } from "react-router-dom";
import UsersService from "../service/UsersService";
import AuthService from "../service/AuthService";
import ForbiddenComponent from "./ForbiddenComponent";

const UserProfilePage = () => {
    const {id} = useParams();
    const [user, setUser] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        UsersService.getUser(id).then(
            (response) => {
                setUser(response.data);
                console.log(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
      }, []);
    
    const logOut = () => {
        AuthService.logout();
        navigate("/");
        window.location.reload();
    };


    return (
        <div>
            {user.name != null &&
                <div className="User-info-div">
                    <p>Имя: {user.name}</p>
                    {user.email && <p>Почта: {user.email}</p>}
                    
                    <Link className="Users-link"><p>Написано отзывов: {user.reviews_count}</p></Link>

                    <p>Привелегии:</p>
                    <ul className="Roles-list">
                        {user.roles?.map((role, index) => (
                            <li key={index}>{role.name == "ROLE_USER" ? "Обычный пользователь" : "Администратор"}<br/></li>
                        ))}
                    </ul>

                    {id == localStorage.getItem("userId") &&
                        <button className="Auth-form-btn" onClick={logOut}>Выйти</button>
                    }
                </div>
            }

            {user.name == null &&
                <ForbiddenComponent/>
            }
        </div>
        
    )
}

export default UserProfilePage;