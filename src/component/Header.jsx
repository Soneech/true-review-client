import React from "react";
import { useState, useEffect } from "react";
import AuthService from "../service/AuthService";
import { Link } from "react-router-dom";

const Header = () => {

    const [auth, setAuth] = useState(false);

    useEffect(() => {
        setNewAuthState();
    }, []);

    const setNewAuthState = () => {
        setAuth(AuthService.checkAuthentication());
    }

    const logOut = () => {
        AuthService.logout();
        setNewAuthState();
    };

    return (
        <header className="App-header">
            <div className="Header-content">
                <div className="Logo-div">
                    <Link to="/"><p className="Logo-text">TrueReview</p></Link>
                    <Link to="/"><p className="Home-link Header-link">Home</p></Link>
                </div>
                
                <div className="Auth-div">
                    {!auth && (
                        <Link to="/auth/login">
                            <p className="Sign-in-link Auth-link Header-link">Sign In</p>
                        </Link>
                    )}
                    {!auth && (
                    <Link to="/auth/registration">
                        <p className="Sign-up-link Auth-link Header-link">Sign Up</p>
                    </Link>
                    )}
                    {auth && (
                        <Link to ="/">
                            <p className="Log-out-link Auth-link Header-link" onClick={logOut}>Log out</p>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header;