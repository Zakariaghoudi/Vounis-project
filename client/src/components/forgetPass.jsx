import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../app/Slices/userSlice";
import "../styles/forgotPassword.css"
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const { status, error, successMessage } = useSelector(
    (state) => state.user);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <div className="page-container">
    <div className="forgot-password-container">
      {successMessage ? (
        <div className="success-message">
          <h4>Please check your email inbox.</h4>
          <p>{successMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Forgot Password?</h2>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          <button type="submit" disabled={status === "pending"}>
            {status === "pending" ? "Sending..." : "Send Link"}
          </button>
      {error && (
        <p className="error-message">{error.msg || "An error occurred"}</p>
      )}
        </form>
      )}

      </div>
  </div>
  );
}

export default ForgotPassword;
