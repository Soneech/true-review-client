import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../service/UserService";

const UsersPage = () => {
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();
    const userService = new UserService();

    useEffect(() => {
        userService.getAllUsers().then(
            (response) => {
                setUsers(response.data);
                console.log(response.data);
            },
            (error) => {
                navigate("/");
                console.log(error);
            }
        );
      }, []);

    return(
        <div className="Users-div Content-block">
                <p className="Page-header">Пользователи</p>

                {users.map((user, i) => (
                    <div key={i} className="User-div Styled-block">
                        <Link to={{ pathname: `/users/${user.id}` }} className="Users-link"><p>{user.name}</p></Link>
                        
                        <p>Привелегии:</p>
                        <ul className="Roles-list">
                            {user.roles.map((role, j) => (
                                <li key={j}>{role.name == "ROLE_USER" ? "Обычный пользователь" : "Администратор"}<br/></li>
                            ))}
                        </ul>
                    </div>
                ))}
        </div>
    )
}

export default UsersPage;
