import React from "react";

const RegistrationForm = () => {
    return (
        <div className="Registration-from Auth-form">
            <p className="Form-text">Registration</p>
            <form>
                <div>
                    <input name="email" placeholder="Email"/>
                </div>

                <div>
                    <input name="login" placeholder="Login"/>
                </div>

                <div>
                    <input name="password" type="password" placeholder="Password"/>
                </div>

                <button type="submit" className="Auth-form-btn">Sign Up</button>
            </form>
        </div>
    )
}

export default RegistrationForm;