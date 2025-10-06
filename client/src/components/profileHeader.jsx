import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/Slices/userSlice";
import "../styles/profilHeader.css";

const profileHeader = ({handleClickEdit}) => {
  const person = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const persons = useSelector((state) => state.user.userList);
  console.log("list of users:", persons);
  console.log("the user is :", person);

  return (
    <header>
      <div className="left-section">
        <img src={person?.profilePhoto} className="photo-profil" />
        <div className="info">
          <h3 className="section-name">
            {person?.name} {person?.lastName}
          </h3>
          <span className="role">{person?.role}</span>
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
