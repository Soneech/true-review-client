import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UsersService from "../service/UsersService";

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
                console.log(error);
            }
        );
      }, []);

    return(
        <div className="Users-div">
            <div>
                {users.map((user, index) => (
                    <div key={index}>
                        <p>{user.name}</p>
                        {user.roles.map((role, index) => (
                            <p>{role.name}</p>
                        ))}
                    </div>
                ))}
            </div>

            {users.length == 0 && (
                <p>Кажется, у вас недостаточно прав для просмотра этой страницы :(</p>
            )}
        </div>
    )
}

export default UsersPage;
