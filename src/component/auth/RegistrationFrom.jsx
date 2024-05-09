import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthService from "../../service/AuthService";


const RegistrationForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [fieldsErrors, setErrors] = useState([]);
    const [errorMessage, setMessage] = useState("");

    const navigate = useNavigate();

    const authService = new AuthService();

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
          await authService.signUp(name, email, password).then(
            (response) => {
                console.log(response);
                navigate("/auth/login");
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
            <div className="Registration-from Auth-form Styled-block">
                <p className="Form-text">Регистрация</p>
                <form onSubmit={handleSignup}>
                    <div>
                        {fieldsErrors.email && <p className="Error-message Form-input-error-message">{fieldsErrors.email[0]}</p>}
                        <input name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    </div>

                    <div>
                        {fieldsErrors.name && <p className="Error-message Form-input-error-message">{fieldsErrors.name[0]}</p>}
                        <input name="name" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}/>
                    </div>

                    <div>
                        {fieldsErrors.password && <p className="Error-message Form-input-error-message">{fieldsErrors.password[0]}</p>}
                        <input name="password" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                    </div>

                    {errorMessage && <p className="Error-message Form-main-error-message">{errorMessage}</p>}
                    <button type="submit" className="Action-btn">Зарегистрироваться</button>
                </form>
            </div>
            <p>Уже есть аккаунт? <Link to="/auth/login" className="Suggestion-link">Войти</Link></p>
        </div>
    )
}

export default RegistrationForm;