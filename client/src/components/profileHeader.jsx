import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/Slices/userSlice";
import "../styles/profilHeader.css";

const profileHeader = ({handleClickEdit, currentuser}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

    return (
    <header>
      <div className="left-section">
        <img src={currentuser?.profilePhoto} className="photo-profil" />
        <div className="info">
          <h3 className="section-name">
            {currentuser?.name} {currentuser?.lastName}
          </h3>
          <span className="role">{currentuser?.role}</span>
          <button className="btn-edit"
          onClick={handleClickEdit}
          >Edit your profil</button>
        </div>
        <button
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
          className="btn-logoutt"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default profileHeader;
