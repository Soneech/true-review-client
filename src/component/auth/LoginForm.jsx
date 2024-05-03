import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../../service/AuthService";

const LoginFrom = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await AuthService.login(email, password).then(
                (response) => {
                    console.log(response);
                    navigate("/");
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
            <div className="Login-from Auth-form">
                <p className="Form-text">Вход в аккаунт</p>
                <form onSubmit={handleLogin}>
                    <div>
                        <input name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    </div>

                    <div>
                        <input name="password" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                    </div>

                    <button type="submit" className="Action-btn">Войти</button>
                </form>
            </div>

            <p>Ещё нет аккаунта? <Link to="/auth/registration" className="Suggestion-link">Зарегистрироваться</Link></p>
        </div>
    )
}

export default LoginFrom;