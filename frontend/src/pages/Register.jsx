import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import api from "../service/api";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post("/auth/register", {

                name,
                email,
                password

            });

            if (res.data.success) {

                alert("Registration Successful!");

                navigate("/");

            }

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Registration Failed"

            );

        }

    };

    return (

        <div className="register-container">

            <div className="register-card">

                <h1>FinOps Dashboard</h1>

                <p>Create your account</p>

                <form onSubmit={handleRegister}>

                    <label>Name</label>

                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">

                        Register

                    </button>

                </form>

                <p className="login-link">

                    Already have an account?

                    <Link to="/"> Login</Link>

                </p>

            </div>

        </div>

    );

}

export default Register;