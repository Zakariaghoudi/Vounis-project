import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../app/Slices/userSlice";
import { useEffect } from "react";
const PrivateRoute = ({role, adminOnly=false}) => {
  const user = useSelector((state)=>state.user.user);
  const isAuth = localStorage.getItem('token');
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(currentUser())
  },[dispatch]);

  if(!isAuth || !user){
  return 
 <Navigate to="/Login" />
  }
  if(adminOnly && user?.role !=='admin'){
    return <Navigate to="/" />  ;
  }
  if(role && role.includes(user?.role)===false){
    return <Navigate to="/" />  ;
  }
  return <Outlet />;
};

export default PrivateRoute;
