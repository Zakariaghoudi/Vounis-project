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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(form));
    navigate("/");
  };
  return (
    <div className="page-register">
      <form onSubmit={handleSubmit} className="register-form ">
        <h2>Login</h2>
        <div className="input-register">
          <label>Enter your email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="input-register">
          <label>Enter your password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <button type="submit">Login</button>
        <div className="register">
          <p>
            Don't have an account? <Link to="/register">Register Now</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default login;
