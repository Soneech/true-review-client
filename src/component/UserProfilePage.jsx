import React, {useState, useEffect} from "react"
import { Link, useParams } from "react-router-dom";
import UsersService from "../service/UsersService";

const UserProfilePage = () => {
    const {id} = useParams();
    const [user, setUser] = useState([]);

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

    return (
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
        </div>
    )
}

export default UserProfilePage;