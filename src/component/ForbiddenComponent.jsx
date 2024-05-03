import React from "react";
import { Link } from "react-router-dom";

const ForbiddenComponent = (props) => {
    return (
        <div>
            <p>Кажется, у вас недостаточно правд для просмотра этой страницы :(</p>
            {props.needAuth &&
                <p>Необходимо <Link to="/auth/login" className="Suggestion-link">Войти</Link> или <Link to="/auth/registration" className="Suggestion-link">Зарегистрироваться</Link></p> 
            }
            
        </div>
    )
}

export default ForbiddenComponent;