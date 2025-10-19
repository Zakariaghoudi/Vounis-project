import "../styles/register.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../app/Slices/userSlice";

function Register() {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: "volunteer",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(userRegister(form));
    navigate("/verification");
  };
  const dispatch = useDispatch();
  const handleRoleChange = (e) => {
    const { checked } = e.target;
    const newRole = checked ? "host" : "volunteer";
    setForm({
      ...form,
      role: newRole,
    });
  };
  const navigate = useNavigate();
  return (
    <div className="page-register">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Resgister Now</h2>
        <div className="name-lastname">
          <div className="input-register">
            <label>Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="input-register">
            <label>Last Name</label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              required
            />
          </div>
        </div>
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

        <div className="inputField">
          <input
            type="checkbox"
            name="host"
            checked={form.role === "host"}
            onChange={handleRoleChange}
          />
          <label>Are you a Host ? </label>
        </div>

        <button type="submit">Register</button>
        <div className="register">
          <p>
            You have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
