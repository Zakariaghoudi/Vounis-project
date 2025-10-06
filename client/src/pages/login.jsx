import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../app/Slices/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "../styles/register.css";

const login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className="wrapper">
      <h2>Login</h2>
      <div className="input-field">
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <label>Enter your email</label>
      </div>
      <div className="input-field">
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <label>Enter your password</label>
      </div>

      <button
        onClick={() => {
          dispatch(userLogin(form));
          setTimeout(() => {
            navigate("/volunteer-profil");
          }, 1000);
        }}
      >
        Login
      </button>
      <div className="register">
        <p>
          Don't have an account? <Link to="/register">Register Now</Link>
        </p>
      </div>
    </form>
  );
};

export default login;
