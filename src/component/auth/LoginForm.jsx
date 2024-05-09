import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthService from "../../service/AuthService";

const LoginFrom = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fieldsErrors, setErrors] = useState([]);
    const [errorMessage, setMessage] = useState("");

    const navigate = useNavigate();

    const authService = new AuthService();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await authService.logIn(email, password).then(
                (response) => {
                    console.log(response);
                    navigate("/");
                    window.location.reload();
                },
                (error) => {
                    if (error.response.status == 400) {
                        setErrors(error.response.data.fields_errors);
                        setMessage(error.response.data.message);
                    }
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
      };

    return (
        <div>
            <div className="Login-from Auth-form Styled-block">
                <p className="Form-text">Вход в аккаунт</p>

                <form onSubmit={handleLogin}>
                    <div>
                        {fieldsErrors.email && <p className="Error-message Form-input-error-message">{fieldsErrors.email[0]}</p>}
                        <input name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                        
                    </div>

                    <div>
                        {fieldsErrors.password && <p className="Error-message Form-input-error-message">{fieldsErrors.password[0]}</p>}
                        <input name="password" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                    </div>

                    {errorMessage && <p className="Error-message Form-main-error-message">{errorMessage}</p>}
                    <button type="submit" className="Action-btn">Войти</button>
                </form>
            </div>

            <p>Ещё нет аккаунта? <Link to="/auth/registration" className="Suggestion-link">Зарегистрироваться</Link></p>
        </div>
    )
}

export default LoginFrom;