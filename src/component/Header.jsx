import React from "react";
import { useState, useEffect } from "react";
import AuthService from "../service/AuthService";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {

    const [auth, setAuth] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setNewAuthState();
    }, []);

    const setNewAuthState = () => {
        setAuth(AuthService.checkAuthentication());
    }

    const openProfile = () => {
        navigate("/users/" + localStorage.getItem("userId"));
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
                    {auth && (
                        <p className="Log-out-link Auth-link Header-link" onClick={openProfile}>Профиль</p>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header;