import { Link, useNavigate } from "react-router-dom";
import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/Slices/userSlice";
import {FaBars, FaTimes} from "react-icons/fa";
const Navbar = () => {

  const checkUser = useSelector((state) => state.user.user);

//---- state form toggle menu----
const [openMenu, setOpenMenu]= useState(false);
const toggleMenu = ()=>{
  setOpenMenu(!openMenu);
};
//----auth && dispatch && navigate---
  const isAuth = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <div className="header">
      <Link to={"/"}>
      <img src="./public/logo.png" />
      </Link>
      <div className="menuOpen" 
      onClick={toggleMenu}>
        {openMenu ? <FaTimes /> : <FaBars/>}
      </div>
      <div className={`nav-links-wrapper${openMenu ? ' open' : ''}`}>
        <div className="nav-links">
        <ul>
          <Link to={"/how-it-work"}>
            <li>How it Works</li>{" "}
          </Link>
          <Link to={"/Discover"}>
            <li>Discover</li>
          </Link>
          <Link to={"/Contact"}>
            <li>Contact Us</li>
          </Link>
        </ul>
        </div>
      <div className="links">
        {checkUser  ? (
        <>
          <button className="btn-signin">
                <Link to={
                checkUser?.role === "volunteer"
                  ? "/volunteer-profil"
                  :  "/profile-host"
              }>
               Profil
               </Link> 
            </button>
          <button
            className="btn-logout"
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
            >
            Logout
            <Link to={"/profil"} />
          </button>
        
            </>
        ) : (
          <div className="btn">
            <button className="btn-signin">
              <Link to={"/login"}> Login</Link>
            </button>
            <button className="btn-register">
              <Link to={"/register"}>Register</Link>
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Navbar ;
