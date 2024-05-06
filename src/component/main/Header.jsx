import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthService from "../../service/AuthService";


const Header = () => {
    const [auth, setAuth] = useState(false);

    const currentUserId = localStorage.getItem("userId");

    const authService = new AuthService();

    useEffect(() => {
        setNewAuthState();
    }, []);

    const setNewAuthState = () => {
        setAuth(authService.checkAuthentication());
    }

    return (
        <header className="App-header">
            <div className="Header-content">
                <div className="Logo-div">
                    <Link to="/"><p className="Logo-text">TrueReview</p></Link>
                    <Link to="/"><p className="Home-link Header-link">Лента</p></Link>
                    <Link to="/categories"><p className="Header-link">Категории</p></Link>
                </div>
                
                <div className="Auth-div">
                    {!auth && (
                        <Link to="/auth/login">
                            <p className="Sign-in-link Auth-link Header-link">Войти</p>
                        </Link>
                    )}
                    {!auth && (
                        <Link to="/auth/registration">
                            <p className="Sign-up-link Auth-link Header-link">Зарегистрироваться</p>
                        </Link>
                    )}
                    {auth &&
                        <Link to="/reviews/new">
                            <p className="Header-link">Написать отзыв</p>    
                        </Link>
                    }
                    {auth && (
                        <Link to={{ pathname: `/users/${currentUserId}` }} className="Auth-link Header-link">
                            <p>Профиль</p>
                        </Link>
                    )}
                    
                </div>
            </div>
        </header>
    )
}

export default Header;