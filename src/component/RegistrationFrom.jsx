import React, { useState } from "react";
import AuthService from "../service/AuthService";
import { useNavigate } from "react-router-dom";

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
        <div className="Registration-from Auth-form">
            <p className="Form-text">Registration</p>
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

                <button type="submit" className="Auth-form-btn">Sign Up</button>
            </form>
        </div>
    )
}

export default RegistrationForm;