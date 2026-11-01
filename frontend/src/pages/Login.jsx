import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../service/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

navigate("/dashboard");

    } catch (err) {

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server Error");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>FinOps Dashboard</h1>

        <p className="subtitle">
          Cloud Cost & Server Metrics Aggregator
        </p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
  type="email"
  name="email"
  placeholder="Enter Email"
  value={formData.email}
  onChange={handleChange}
  required
/>

          <label>Password</label>

          <input
  type="password"
  name="password"
  placeholder="Enter Password"
  value={formData.password}
  onChange={handleChange}
  required
/>

          <button type="submit">

            {loading ? "Logging in..." : "Login"}

          </button>

        </form>

        <div className="register-link">

          Don't have an account?

          <Link to="/register">

            Register

          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;