import React, {useState, useEffect} from "react"
import { Link, useParams, useNavigate } from "react-router-dom";
import UsersService from "../../service/UsersService";
import AuthService from "../../service/AuthService";

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
                if (error.response.status == 401 || error.response.status == 405) {
                    AuthService.logout();
                    navigate("/");
                }
                else if (error.response.status == 404) {
                    navigate("/");
                }
                console.log(error);
            }
        );
      }, []);
    
    const logOut = () => {
        AuthService.logout();
        navigate("/");
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
                        <button className="Action-btn" onClick={logOut}>Выйти</button>
                    }
                </div>
            }
        </div>
        
    )
}

export default UserProfilePage;