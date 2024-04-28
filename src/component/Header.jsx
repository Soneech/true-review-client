import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="App-header">
            <div className="Header-content">
                <div className="Logo-div">
                    <Link to="/"><p className="Logo-text">TrueReview</p></Link>
                    <Link to="/"><p className="Home-link Header-link">Home</p></Link>
                </div>
                
                <div className="Auth-div">
                    <Link to="/auth/login">
                        <p className="Sign-in-link Auth-link Header-link">Sign In</p>
                    </Link>
                    <Link to="/auth/registration">
                        <p className="Sign-up-link Auth-link Header-link">Sign Up</p>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header;