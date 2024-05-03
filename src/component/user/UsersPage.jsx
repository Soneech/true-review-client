import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UsersService from "../../service/UsersService";

const UsersPage = () => {
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        UsersService.getAllUsers().then(
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
        </div>
    )
}

export default UsersPage;
