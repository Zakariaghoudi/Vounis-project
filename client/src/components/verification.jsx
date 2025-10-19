import "../styles/verification.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userVerification } from "../app/Slices/userSlice";
import { useNavigate } from "react-router-dom";

const verification = () => {
  const [verificationCode, setverificationCode] = useState("");
  const user = useSelector((state)=>state.user.user);
  const userEmail = user?.email
  console.log(userEmail)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!userEmail){
      navigate("/verification");
    }
  },[userEmail,navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!verificationCode || verificationCode.length !== 6) {
      alert("enter a valid code");
    }
    const result = await dispatch(
      userVerification({ otpCode: verificationCode, email : userEmail })
    );
    if (userVerification.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="verification-page">
      <div className="verification-card">
        <form onSubmit={handleSubmit} className="form-verification">
        <h2>Account verification</h2>
        <p>
          Please enter the 6-digit verification code that was sent to your email
        </p>
          <div className="input-group">
            <label>The code verification :</label>
            <input
              type="strig"
              maxLength={6}
              placeholder="______"
              value={verificationCode}
              onChange={(e) => setverificationCode(e.target.value)}
              required
            />
            <button className="verification-button" type="submit"> Send code </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default verification;
