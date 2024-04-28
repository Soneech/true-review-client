import React from "react";

const LoginFrom = () => {
    return (
        <div className="Login-from Auth-form">
            <p className="Form-text">Authorization</p>
            <form>
                <div>
                    <input name="email" placeholder="Email"/>
                </div>

                <div>
                    <input name="password" type="password" placeholder="Password"/>
                </div>

                <button type="submit" className="Auth-form-btn">Sign In</button>
            </form>
        </div>
    )
}

export default LoginFrom;