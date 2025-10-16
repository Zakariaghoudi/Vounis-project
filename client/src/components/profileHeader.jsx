import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/Slices/userSlice";
import "../styles/profilHeader.css";

const ProfileHeader = ({ handleClickEdit }) => {
  const person = useSelector((state) => state.user.user);
  const role = person?.role;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  return (
    <div className="contact">
      <div className="left-section">
        <div className="info">
        <img src={person?.profilePhoto} className="photo-profil" />
          <h3 className="section-name">
            {person?.name}
          </h3>
          <h3 className="section-name">
             {person?.lastName}
          </h3>
          <span className="role">{person?.role}</span>

        </div>
        <div className="btns">
          {role === "volunteer" ? (
            <button className="edit-btn" onClick={handleClickEdit}>
              Edit Profil
            </button>
          ) : null}
        <button
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
          className="logout-btn"
        >
          Logout
        </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
