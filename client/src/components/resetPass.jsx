import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../app/Slices/userSlice";
import "../styles/resetPass.css"
function ResetPassword() {
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, successMessage } = useSelector((state) => state.user);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(resetPassword({ token, password }));
  };
   if (successMessage) {
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  }

  return (
    <div className="reset-password-container">
      
      <form onSubmit={handleSubmit}>
<h2>Create a New Password</h2>
      <p>Your new password must be different from the previous one.</p>


        <label htmlFor="password">New Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter your new password"
          required
        />

        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your new password"
          required
        />

        <button type="submit" disabled={status === "pending"}>
          {status === "pending" ? "Resetting..." : "Reset Password"}
        </button>
      {error && (
        <p className="error-message">{error}</p>
      )}
      {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
}

export default ResetPassword;
