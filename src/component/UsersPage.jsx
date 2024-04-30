import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UsersService from "../service/UsersService";

const UsersPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        UsersService.getAllUsers().then(
            (response) => {
                setUsers(response.data);
                console.log(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
      }, []);

    return(
        <div className="Users-div">
                {users.map((user, i) => (
                    <div key={i} className="User-div">
                        <Link to={{ pathname: `/users/${user.id}` }} className="Users-link"><p>{user.name}</p></Link>
                        
                        <p>Привелегии:</p>
                        <ul className="Roles-list">
                            {user.roles.map((role, j) => (
                                <li key={j}>{role.name == "ROLE_USER" ? "Обычный пользователь" : "Администратор"}<br/></li>
                            ))}
                        </ul>
                    </div>
                ))}

            {users.length == 0 && (
                <p>Кажется, у вас недостаточно прав для просмотра этой страницы :(</p>
            )}
        </div>
    )
}

export default UsersPage;
