import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import { logout } from "../app/userSlice/userSlice";
const navbar = () => {
    const isAuth = localStorage.getItem('token');
    const dispatch = useDispatch();
    const navigate = useNavigate();
  return (
    
    <div className="header">
      <img src='./public/logo.png' />           
      <div className="nav-links">
        <ul>
          <Link to ={'/work'}><li>How it Works</li> </Link>
          <Link to ={'/Discover'}><li>Discover</li></Link>
          <Link to ={'/Contact'}><li>Contact Us</li></Link>
        </ul>
        </div>
        <div className="links">
        {isAuth ?(
          <button className="btn-logout" onClick={()=>{
            dispatch(logout());
           navigate("/login");
          }}>
            Logout
            <Link to={"/profil"} />
          </button>
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
  )
};

export default navbar;
