import React from "react";
import { Link } from "react-router-dom";

const ForbiddenPage = (props) => {

    return (
        <div className="Content-block">
                <p>Кажется, у вас недостаточно прав для просмотра этой страницы :(</p>
                
                {props.needAuth &&
                <p>Необходимо <Link to="/auth/login" className="Suggestion-link">Войти</Link> или <Link to="/auth/registration" className="Suggestion-link">Зарегистрироваться</Link></p> 
                }
        </div>
    )
}

export default ForbiddenPage;