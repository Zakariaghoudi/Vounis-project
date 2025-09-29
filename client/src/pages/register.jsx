import "./register.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userRegister } from "../app/userSlice/userSlice";

function Register() {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const dispatch = useDispatch();

  return (
      <form className="wrapper" onSubmit={handleSubmit}>
        <h2>Resgister</h2>
        <div className="input-field">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <label>Name</label>
        </div>
        <div className="input-field">
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            required
          />
          <label>Last Name</label>
        </div>
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
            dispatch(userRegister(form));
          }}
        >
          Register
        </button>
        <div className="register">
          <p>
            You have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
  );
}

export default Register;
