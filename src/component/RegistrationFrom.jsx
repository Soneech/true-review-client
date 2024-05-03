import React, { useState } from "react";
import AuthService from "../service/AuthService";
import { useNavigate, Link } from "react-router-dom";

const RegistrationForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
          await AuthService.signup(name, email, password).then(
            (response) => {
                console.log(response);
                navigate("/auth/login");
                window.location.reload();
            },
            (error) => {
                console.log(error);
            }
          );
        } catch (err) {
            console.log(err);
        }
      };

    return (
        <div>
            <div className="Registration-from Auth-form">
                <p className="Form-text">Регистрация</p>
                <form onSubmit={handleSignup}>
                    <div>
                        <input name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    </div>

                    <div>
                        <input name="name" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}/>
                    </div>

                    <div>
                        <input name="password" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                    </div>

                    <button type="submit" className="Action-btn">Зарегистрироваться</button>
                </form>
            </div>
            <p>Уже есть аккаунт? <Link to="/auth/login" className="Suggestion-link">Войти</Link></p>
        </div>
    )
}

export default RegistrationForm;